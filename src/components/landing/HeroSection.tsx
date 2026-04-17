import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TypeAnimation } from "react-type-animation";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function HeroSection({ onLogin }: { onLogin: () => void }) {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 pb-32">
      {/* Particle Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "grab",
              },
            },
            modes: {
              grab: {
                distance: 140,
                links: {
                  opacity: 0.5,
                },
              },
            },
          },
          particles: {
            color: {
              value: ["#7C3AED", "#06B6D4"],
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.1,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 40,
            },
            opacity: {
              value: 0.3,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 z-0"
      />

      {/* Noise Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface/80 backdrop-blur-md border border-white/10 text-sm mb-8 font-mono text-accent shadow-lg"
        >
          <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse"></span>
          Webzeo 2.0 is now live
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] mb-6 font-display max-w-5xl"
        >
          Describe it. <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Deploy it.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl sm:text-2xl text-text-muted mb-10 max-w-2xl leading-relaxed h-20 sm:h-auto flex items-center justify-center"
        >
          <TypeAnimation
            sequence={[
              'Build a SaaS Dashboard',
              2000,
              'Create an E-commerce Store',
              2000,
              'Launch a REST API',
              2000,
              'Build a Real-time Chat App',
              2000
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="font-medium text-text-primary"
          />
          <span className="ml-2">in seconds.</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Button onClick={onLogin} size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-14 px-8 text-base font-medium shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_40px_rgba(124,58,237,0.6)] transition-all duration-300 w-full sm:w-auto relative overflow-hidden group">
            <span className="relative z-10 flex items-center">Start Building Free <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
          </Button>
          
          <Dialog>
            <DialogTrigger 
              render={
                <Button variant="outline" size="lg" className="rounded-full h-14 px-8 text-base font-medium border-white/10 hover:bg-white/5 w-full sm:w-auto backdrop-blur-sm" />
              }
            >
              <Play className="mr-2 w-5 h-5" /> Watch Demo
            </DialogTrigger>
            <DialogContent className="max-w-4xl bg-surface border-white/10 p-0 overflow-hidden">
              <div className="aspect-video bg-black flex items-center justify-center relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Play className="w-16 h-16 text-white/20 mx-auto mb-4" />
                    <p className="text-text-muted">Demo video placeholder</p>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 pt-10 border-t border-white/5 w-full max-w-4xl flex flex-wrap justify-center gap-8 sm:gap-16 text-sm font-mono text-text-muted"
        >
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-bold text-text-primary font-display">2.4M+</span>
            <span>Apps Built</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-bold text-text-primary font-display">180+</span>
            <span>Countries</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-bold text-text-primary font-display">99.98%</span>
            <span>Uptime</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-bold text-text-primary font-display">40K+</span>
            <span>Developers</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
