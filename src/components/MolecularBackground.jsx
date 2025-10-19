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
      color: 0x3b82f6, transparent: true, opacity: 0.8
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

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x60a5fa, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending
    });
    const lines = [];
    const maxDistance = 20;

    const updateConnections = () => {
      lines.forEach(l => scene.remove(l));
      lines.length = 0;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const d = particles[i].position.distanceTo(particles[j].position);
          if (d < maxDistance) {
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array([
              particles[i].position.x, particles[i].position.y, particles[i].position.z,
              particles[j].position.x, particles[j].position.y, particles[j].position.z
            ]);
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            const line = new THREE.Line(geometry, lineMaterial.clone());
            line.material.opacity = (1 - d / maxDistance) * 0.4;
            lines.push(line);
            scene.add(line);
          }
        }
      }
    };

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
      lines.forEach(l => { l.geometry.dispose(); l.material.dispose(); });
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
