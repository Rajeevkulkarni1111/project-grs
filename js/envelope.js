(function () {
    const CLOUD_POSITIONS = {
        intro: {
            desktop: { cloud1: "6%", cloud2: "76%", cloud3: "9%", cloud4: "80%" },
            tablet: { cloud1: "1%", cloud2: "65%", cloud3: "-2%", cloud4: "60%" },
            mobile: { cloud1: "0%", cloud2: "54%", cloud3: "-3%", cloud4: "54%" }
        },
        arrival: {
            desktop: { cloud1: "-6%", cloud2: "86%", cloud3: "2%", cloud4: "90%" },
            tablet: { cloud1: "-8%", cloud2: "74%", cloud3: "-8%", cloud4: "70%" },
            mobile: { cloud1: "-10%", cloud2: "64%", cloud3: "-10%", cloud4: "66%" }
        }
    };

    const getViewportKey = () => {
        if (window.innerWidth <= 480) {
            return "mobile";
        }

        if (window.innerWidth <= 768) {
            return "tablet";
        }

        return "desktop";
    };

    window.createEnvelopeScene = function createEnvelopeScene(root) {
        const elements = {
            sky: root.querySelector(".sky"),
            hero: root.querySelector(".hero"),
            title: root.querySelector("#grs"),
            gift: root.querySelector(".gift"),
            name: root.querySelector(".name"),
            beginButton: root.querySelector("#beginBtn"),
            sun: root.querySelector(".sun"),
            sunGlow: root.querySelector(".sun-glow"),
            cloud1: root.querySelector(".cloud1"),
            cloud2: root.querySelector(".cloud2"),
            cloud3: root.querySelector(".cloud3"),
            cloud4: root.querySelector(".cloud4"),
            envelopeStage: root.querySelector(".envelope-stage"),
            envelopeWrap: root.querySelector(".envelope-wrap"),
            envelope: root.querySelector(".envelope"),
            envelopeFlap: root.querySelector(".envelope-flap"),
            envelopeSeal: root.querySelector(".envelope-seal"),
            envelopeShadow: root.querySelector(".envelope-shadow"),
            tapHint: root.querySelector(".envelope-tap-hint"),
            letterSheet: root.querySelector(".letter-sheet"),
            letterPaper: root.querySelector(".letter-paper")
        };

        const getCloudPositions = mode => {
            const viewportKey = getViewportKey();
            return CLOUD_POSITIONS[mode][viewportKey];
        };

        const getCloudArray = () => [
            elements.cloud1,
            elements.cloud2,
            elements.cloud3,
            elements.cloud4
        ];

        const setEnvelopeInitialState = () => {
            gsap.set(elements.envelopeStage, {
                autoAlpha: 0,
                pointerEvents: "none"
            });

            gsap.set(elements.envelopeWrap, {
                y: -window.innerHeight * 0.78,
                rotation: -8,
                scale: 0.94,
                transformOrigin: "50% 50%"
            });

            gsap.set(elements.envelopeShadow, {
                opacity: 0,
                scale: 0.56,
                transformOrigin: "50% 50%"
            });

            gsap.set(elements.envelopeFlap, {
                rotationX: 0,
                transformOrigin: "50% 0%"
            });

            gsap.set(elements.envelopeSeal, {
                scale: 1,
                opacity: 1
            });

            gsap.set(elements.letterSheet, {
                y: 68,
                scaleY: 0.42,
                transformOrigin: "50% 0%"
            });

            gsap.set(elements.letterPaper, {
                opacity: 1
            });

            gsap.set(
                [
                    elements.letterPaper.querySelector(".letter-greeting"),
                    elements.letterPaper.querySelector(".letter-copy")
                ],
                { opacity: 0, y: 10 }
            );

            gsap.set(elements.tapHint, {
                opacity: 0,
                y: 8
            });
        };

        const createArrivalTimeline = () => gsap.timeline({
            defaults: {
                ease: "power2.inOut"
            }
        });

        const createEnvelopeDescent = onComplete => {
            const descent = gsap.timeline({
                defaults: {
                    ease: "power2.out"
                },
                onStart: () => {
                    gsap.set(elements.envelopeStage, {
                        autoAlpha: 1,
                        pointerEvents: "none"
                    });
                },
                onComplete: () => {
                    gsap.set(elements.envelopeStage, {
                        pointerEvents: "auto"
                    });

                    if (typeof onComplete === "function") {
                        onComplete();
                    }
                }
            });

            descent
                .to(elements.envelopeShadow, {
                    opacity: 0.2,
                    scale: 1,
                    duration: 1.5,
                    ease: "sine.out"
                }, 0)
                .to(elements.envelopeWrap, {
                    y: 18,
                    rotation: 2,
                    scale: 1,
                    duration: 1.85,
                    ease: "power2.in"
                }, 0)
                .to(elements.envelopeWrap, {
                    y: -8,
                    rotation: -0.8,
                    duration: 0.24,
                    ease: "power1.out"
                })
                .to(elements.envelopeWrap, {
                    y: 0,
                    rotation: 0,
                    duration: 0.48,
                    ease: "back.out(1.4)"
                })
                .to(elements.tapHint, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "sine.out"
                }, "-=0.1");

            return descent;
        };

        const createOpenTimeline = () => {
            const openTimeline = gsap.timeline({
                defaults: {
                    ease: "power2.out"
                }
            });

            /* ── Phase 1: Fade out hero text ── */
            openTimeline
                .to(elements.tapHint, {
                    opacity: 0,
                    y: -6,
                    duration: 0.22,
                    ease: "sine.in"
                })
                .to(elements.hero, {
                    opacity: 0.08,
                    duration: 0.8,
                    ease: "sine.inOut"
                }, "<0.06");

            /* ── Phase 2: Envelope reacts to click ── */
            openTimeline
                .to(elements.envelopeWrap, {
                    scale: 0.96,
                    duration: 0.2,
                    ease: "power2.in"
                }, "-=0.5")
                .to(elements.envelopeWrap, {
                    scale: 1.02,
                    duration: 0.28,
                    ease: "back.out(2)"
                })
                .to(elements.envelopeWrap, {
                    scale: 1,
                    duration: 0.18,
                    ease: "sine.out"
                });

            /* ── Phase 3: Seal pulses, glows, then breaks ── */
            openTimeline
                .to(elements.envelopeSeal, {
                    scale: 1.16,
                    boxShadow: "0 0 24px rgba(100, 160, 220, 0.55), 0 0 48px rgba(100, 160, 220, 0.25)",
                    duration: 0.32,
                    ease: "sine.inOut"
                }, "-=0.04")
                .to(elements.envelopeSeal, {
                    scale: 0.5,
                    opacity: 0,
                    y: -18,
                    duration: 0.34,
                    ease: "back.in(2.4)",
                    onStart: function () {
                        createSealParticles(elements.envelopeSeal, elements.envelope);
                    }
                });

            /* ── Phase 4: Flap opens dramatically ── */
            openTimeline
                .to(elements.envelopeFlap, {
                    rotationX: -80,
                    duration: 0.9,
                    ease: "power2.inOut"
                }, "-=0.06")
                .to(elements.envelopeFlap, {
                    rotationX: -145,
                    duration: 0.7,
                    ease: "power1.out"
                });

            /* ── Phase 5: Dramatic pause — anticipation ── */
            openTimeline
                .to({}, {
                    duration: 0.42,
                    onComplete: () => {
                        elements.envelope.style.overflow = "visible";
                    }
                });

            /* ── Phase 6: Letter slowly rises — partial reveal ── */
            openTimeline
                .to(elements.letterSheet, {
                    y: -48,
                    duration: 0.72,
                    ease: "power2.out"
                })
                .to({}, { duration: 0.32 })
                .to(elements.letterSheet, {
                    y: -138,
                    duration: 0.86,
                    ease: "back.out(1.2)"
                });

            /* ── Phase 7: Letter unfolds ── */
            openTimeline
                .to({}, { duration: 0.26 })
                .to(elements.letterSheet, {
                    scaleY: 1,
                    duration: 0.92,
                    ease: "power3.out"
                });

            /* ── Phase 8: Text fades in line by line ── */
            openTimeline
                .to({}, { duration: 0.3 })
                .to(elements.letterPaper, {
                    opacity: 1,
                    duration: 0.4,
                    ease: "sine.out"
                })
                .fromTo(elements.letterPaper.querySelector(".letter-greeting"), {
                    opacity: 0,
                    y: 10
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.62,
                    ease: "power2.out"
                }, "+=0.12")
                .fromTo(elements.letterPaper.querySelector(".letter-copy"), {
                    opacity: 0,
                    y: 12
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.68,
                    ease: "power2.out"
                }, "+=0.18");

            /* ── Phase 9: Settle ── */
            openTimeline
                .to(elements.envelopeShadow, {
                    opacity: 0.14,
                    scale: 0.9,
                    duration: 0.5,
                    ease: "sine.out"
                }, "-=0.4");

            return openTimeline;
        };

        /**
         * Creates small particle sparkles when the seal breaks,
         * giving the moment a magical, premium feel.
         */
        const createSealParticles = (sealEl, containerEl) => {
            const rect = sealEl.getBoundingClientRect();
            const containerRect = containerEl.getBoundingClientRect();
            const cx = rect.left + rect.width / 2 - containerRect.left;
            const cy = rect.top + rect.height / 2 - containerRect.top;
            const count = 8;

            for (let i = 0; i < count; i++) {
                const particle = document.createElement("div");
                particle.className = "seal-particle";
                particle.style.left = cx + "px";
                particle.style.top = cy + "px";
                containerEl.appendChild(particle);

                const angle = (Math.PI * 2 / count) * i + (Math.random() * 0.4 - 0.2);
                const distance = 28 + Math.random() * 32;

                gsap.to(particle, {
                    x: Math.cos(angle) * distance,
                    y: Math.sin(angle) * distance,
                    opacity: 0,
                    scale: 0,
                    duration: 0.56 + Math.random() * 0.2,
                    ease: "power2.out",
                    onComplete: () => {
                        particle.remove();
                    }
                });
            }
        };

        return {
            elements,
            getCloudPositions,
            getCloudArray,
            setEnvelopeInitialState,
            createArrivalTimeline,
            createEnvelopeDescent,
            createOpenTimeline
        };
    };
})();
