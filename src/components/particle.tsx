import { useCallback, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container, Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";


export const Particle = () => {
    const [init, setInit] = useState(false);
  
    useEffect(() => {
      initParticlesEngine(async (engine: any) => {
        await loadSlim(engine);
      }).then(() => {
        setInit(true);
      });
    }, []);
  
    return (
      <>
        {init && (
          <Particles
            id="tsparticles"
            options={{
              fpsLimit: 120,
              interactivity: {
                events: {
                  onClick: {
                    enable: true,
                    mode: "push",
                  },
                },
                modes: {
                  push: {
                    quantity: 4,
                  },
                },
              },
              particles: {
                color: {
                  value: "#815854",
                },
                links: {
                  color: "#815854",
                  distance: 400,
                  enable: true,
                  opacity: 0.4,
                  width: 1.5,
                },
                move: {
                  direction: "none",
                  enable: true,
                  outModes: {
                    default: "bounce",
                  },
                  random: false,
                  speed: 1.5,
                  straight: false,
                },
                number: {
                  density: {
                    enable: true,
                  },
                  value: 50,
                },
                opacity: {
                  value: 0.25,
                },
                shape: {
                  type: "circle",
                },
                size: {
                  value: { min: 0, max: 0 },
                },
              },
              detectRetina: true,
            }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: -1,
            }}
          />
        )}
      </>
    );
  };