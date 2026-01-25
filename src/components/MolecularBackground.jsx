// components/MolecularBackground.jsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function MolecularBackground() {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
  
    const getSize = () => {
      const { width, height } = el.getBoundingClientRect();
      return { width: Math.max(1, width), height: Math.max(1, height) };
    };

    // Scene
    const scene = new THREE.Scene();
    const { width, height } = getSize();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    el.appendChild(renderer.domElement);

    // --- your particles/lines/lights code (unchanged) ---
    const particleCount = 200;
    const particles = [];
    const particleGeometry = new THREE.SphereGeometry(0.15, 8, 8);
    const particleMaterial = new THREE.MeshBasicMaterial({
      color: 0x3b82f6, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending
    });

    for (let i = 0; i < particleCount; i++) {
      const p = new THREE.Mesh(particleGeometry, particleMaterial.clone());
      p.position.set(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100
      );
      p.userData.velocity = {
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02
      };
      p.userData.originalPosition = p.position.clone();
      particles.push(p);
      scene.add(p);
    }

    // ----- Connections: ONE LineSegments with shared buffers (fast) -----
const maxDistance = 20;

// Worst-case number of connections is all pairs: n*(n-1)/2
// Why: we preallocate buffers once, then just overwrite numbers (no new objects).
const maxPairs = (particleCount * (particleCount - 1)) / 2;

// Each connection is 2 points (2 vertices), each vertex has x,y,z => 2 * 3 = 6 floats
const linePositions = new Float32Array(maxPairs * 6);

// Optional: per-vertex colors (lets us fake "opacity by distance" using brightness)
// Why: avoids creating separate materials per line (expensive).
const lineColors = new Float32Array(maxPairs * 6);

// Base line color in RGB (0..1)
const baseColor = new THREE.Color(0x60a5fa);

const lineGeometry = new THREE.BufferGeometry();
lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));
lineGeometry.setDrawRange(0, 0); // Why: we will change how many vertices are drawn each update.

const lineMaterial = new THREE.LineBasicMaterial({
  vertexColors: true,             // Why: use lineColors buffer
  transparent: true,
  opacity: 0.35,                  // Global opacity; brightness handled via vertex color
  blending: THREE.AdditiveBlending
});

const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
scene.add(lineSegments);

// Replaces your old updateConnections()
const updateConnections = () => {
  let ptr = 0; // pointer into Float32Array

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i].position;
      const b = particles[j].position;
      const d = a.distanceTo(b);

      if (d < maxDistance) {
        // Write line endpoints into the shared position buffer
        linePositions[ptr]     = a.x; linePositions[ptr + 1] = a.y; linePositions[ptr + 2] = a.z;
        linePositions[ptr + 3] = b.x; linePositions[ptr + 4] = b.y; linePositions[ptr + 5] = b.z;

        // Brightness based on distance (closer = brighter)
        const t = 1 - d / maxDistance;          // 0..1
        const intensity = 0.15 + t * 0.85;      // keep a minimum brightness

        // Same color for both vertices of the segment
        lineColors[ptr]     = baseColor.r * intensity;
        lineColors[ptr + 1] = baseColor.g * intensity;
        lineColors[ptr + 2] = baseColor.b * intensity;
        lineColors[ptr + 3] = baseColor.r * intensity;
        lineColors[ptr + 4] = baseColor.g * intensity;
        lineColors[ptr + 5] = baseColor.b * intensity;

        ptr += 6;

        // Safety: don't exceed preallocated buffer
        if (ptr >= linePositions.length) break;
      }
    }
    if (ptr >= linePositions.length) break;
  }

  // Tell Three.js how many vertices to draw (ptr floats / 3 floats per vertex)
  lineGeometry.setDrawRange(0, ptr / 3);

  // Tell Three.js the buffers changed
  lineGeometry.attributes.position.needsUpdate = true;
  lineGeometry.attributes.color.needsUpdate = true;
};


    // const lineMaterial = new THREE.LineBasicMaterial({
    //   color: 0x60a5fa, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending
    // });
    // const lines = [];
    // const maxDistance = 20;

    // const updateConnections = () => {
    //   lines.forEach(l => scene.remove(l));
    //   lines.length = 0;
    //   for (let i = 0; i < particles.length; i++) {
    //     for (let j = i + 1; j < particles.length; j++) {
    //       const d = particles[i].position.distanceTo(particles[j].position);
    //       if (d < maxDistance) {
    //         const geometry = new THREE.BufferGeometry();
    //         const positions = new Float32Array([
    //           particles[i].position.x, particles[i].position.y, particles[i].position.z,
    //           particles[j].position.x, particles[j].position.y, particles[j].position.z
    //         ]);
    //         geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    //         const line = new THREE.Line(geometry, lineMaterial.clone());
    //         line.material.opacity = (1 - d / maxDistance) * 0.4;
    //         lines.push(line);
    //         scene.add(line);
    //       }
    //     }
    //   }
    // };

    scene.fog = new THREE.Fog(0x0f172a, 40, 120);
    const centerLight = new THREE.PointLight(0x60a5fa, 1, 100);
    centerLight.position.set(0, 0, 0);
    scene.add(centerLight);
    const ambientLight = new THREE.AmbientLight(0x1e3a8a, 0.5);
    scene.add(ambientLight);

    // Mouse: listen on the container, not the window
    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseRef.current.x = x * 2 - 1;
      mouseRef.current.y = -(y * 2 - 1);
    };
    window.addEventListener('mousemove', handleMouseMove); // <— listen globally
  
    let frameCount = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      frameCount++;

      particles.forEach((p, idx) => {
        p.position.x += p.userData.velocity.x;
        p.position.y += p.userData.velocity.y;
        p.position.z += p.userData.velocity.z;

        const mouse3D = new THREE.Vector3(mouseRef.current.x * 30, mouseRef.current.y * 30, 0);
        const dist = p.position.distanceTo(mouse3D);
        if (dist < 25) {
          const dir = new THREE.Vector3().subVectors(p.position, mouse3D).normalize();
          p.position.add(dir.multiplyScalar(3 * (1 - dist / 25)));
        }

        p.position.lerp(p.userData.originalPosition, 0.002);

        if (Math.abs(p.position.x) > 50) p.userData.velocity.x *= -1;
        if (Math.abs(p.position.y) > 50) p.userData.velocity.y *= -1;
        if (Math.abs(p.position.z) > 50) p.userData.velocity.z *= -1;

        const s = 1 + Math.sin(frameCount * 0.02 + idx) * 0.3;
        p.scale.set(s, s, s);

        const hue = 0.6 + Math.sin(frameCount * 0.01 + idx * 0.1) * 0.05;
        p.material.color.setHSL(hue, 0.8, 0.6);
      });

      if (frameCount % 3 === 0) updateConnections();

      camera.position.x += (mouseRef.current.x * 10 - camera.position.x) * 0.05;
      camera.position.y += (mouseRef.current.y * 10 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
      scene.rotation.y += 0.0005;

      renderer.render(scene, camera);
    };
    animate();

    // Resize: observe the container
    const ro = new ResizeObserver(() => {
      const { width: w, height: h } = getSize();
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    });
    ro.observe(el);

    return () => {
      ro.disconnect();
      window.removeEventListener('mousemove', handleMouseMove); // <— remove window listener
      if (renderer.domElement && el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
      renderer.dispose();
      particles.forEach(p => { p.geometry.dispose(); p.material.dispose(); });
      scene.remove(lineSegments);
      lineGeometry.dispose();
      lineMaterial.dispose();

      // lines.forEach(l => { l.geometry.dispose(); l.material.dispose(); });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="hero-bg"
      aria-hidden="true"
    />
  );
}
