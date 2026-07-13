"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import * as d3 from "d3-geo";
import { feature } from "topojson-client";
import { cn } from "@/lib/utils";

// Simplified world landmass outlines (land-110m), loaded at runtime.
const WORLD_ATLAS_URL = "https://unpkg.com/world-atlas@2.0.2/land-110m.json";

export function Globe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    let animationId: number;
    let renderer: THREE.WebGLRenderer;
    let resizeObserver: ResizeObserver;
    let cancelled = false;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 10);
    camera.position.z = 2.6;

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1, 64, 64),
      new THREE.MeshBasicMaterial({ transparent: true })
    );
    const globeGroup = new THREE.Group();
    
    // Tilt forward (positive X) and slight rightside (negative Z)
    globeGroup.rotation.x = 0.5; // Tilt forward
    globeGroup.rotation.z = -0.3; // Tilt right
    
    globeGroup.add(sphere);
    scene.add(globeGroup);

    // Draws the grid + continents onto a flat canvas, which is then
    // wrapped onto the sphere as a texture.
    function buildTexture(land: any) {
      const width = 2048;
      const height = 1024;
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d")!;

      const projection = d3
        .geoEquirectangular()
        .fitSize([width, height], { type: "Sphere" } as any);
      const path = d3.geoPath(projection, ctx as any);

      ctx.clearRect(0, 0, width, height);

      // Lat/long grid lines
      ctx.strokeStyle = "rgba(255,255,255,0.35)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      path(d3.geoGraticule10());
      ctx.stroke();

      // Outer sphere outline
      ctx.strokeStyle = "rgba(255,255,255,0.6)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      path({ type: "Sphere" } as any);
      ctx.stroke();

      // Solid continent shapes
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      path(land);
      ctx.fill();

      return canvas;
    }

    async function init() {
      const res = await fetch(WORLD_ATLAS_URL);
      const topo = await res.json();
      const land = feature(topo, topo.objects.land as any);

      if (cancelled || !canvasRef.current || !containerRef.current) return;

      const textureCanvas = buildTexture(land);
      const texture = new THREE.CanvasTexture(textureCanvas);
      texture.needsUpdate = true;
      texture.colorSpace = THREE.SRGBColorSpace;

      const material = sphere.material as THREE.MeshBasicMaterial;
      material.map = texture;
      material.needsUpdate = true;

      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true,
        antialias: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const resize = () => {
        if (!containerRef.current) return;
        const size = containerRef.current.clientWidth;
        renderer.setSize(size, size, false);
        camera.aspect = 1;
        camera.updateProjectionMatrix();
      };

      resize();
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(containerRef.current);

      const animate = () => {
        sphere.rotation.y += 0.003; // slow spin, like cobe's old "phi"
        renderer.render(scene, camera);
        animationId = requestAnimationFrame(animate);
      };
      animate();
    }

    init();

    return () => {
      cancelled = true;
      if (animationId) cancelAnimationFrame(animationId);
      resizeObserver?.disconnect();
      sphere.geometry.dispose();
      (sphere.material as THREE.Material).dispose();
      renderer?.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full aspect-square relative flex items-center justify-center pointer-events-none",
        className
      )}
    >
      {/* Soft white glow behind the globe, standing in for cobe's old glowColor */}
      <div
        className="absolute inset-0 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 70%)",
        }}
      />
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", position: "relative" }} />
    </div>
  );
}
