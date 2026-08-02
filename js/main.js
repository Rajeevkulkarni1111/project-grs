window.addEventListener("load", () => {
    const scene = window.createEnvelopeScene(document);
    const {
        sky,
        hero,
        title,
        gift,
        name,
        beginButton,
        sun,
        sunGlow,
        envelopeStage,
        envelope
    } = scene.elements;

    const introPositions = scene.getCloudPositions("intro");
    let envelopeReady = false;
    let envelopeOpened = false;

    scene.setEnvelopeInitialState();

    beginButton.disabled = true;
    gsap.set(hero, { y: 24 });
    gsap.set(sun, { y: 92, scale: 0.94 });
    gsap.set(sunGlow, { y: 72, scale: 0.9 });
    gsap.set([gift, name], { y: 16 });
    gsap.set(beginButton, { y: 16, scale: 0.94 });

    const introTimeline = gsap.timeline({
        defaults: {
            ease: "power2.out"
        },
        onComplete: () => {
            envelopeReady = true;
            beginButton.style.pointerEvents = "auto";
            beginButton.disabled = false;
            sky.classList.add("is-ready");
        }
    });

    introTimeline
        .to({}, { duration: 0.45 })
        .to(sunGlow, {
            opacity: 0.85,
            y: 0,
            scale: 1,
            duration: 1.9,
            ease: "sine.out"
        })
        .to(sun, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 2.2,
            ease: "power2.out"
        }, "<0.12")
        .to(scene.elements.cloud1, {
            left: introPositions.cloud1,
            duration: 2.3,
            ease: "sine.inOut"
        }, "<0.18")
        .to(scene.elements.cloud2, {
            left: introPositions.cloud2,
            duration: 2.3,
            ease: "sine.inOut"
        }, "<")
        .to(scene.elements.cloud3, {
            left: introPositions.cloud3,
            duration: 2.3,
            ease: "sine.inOut"
        }, "<")
        .to(scene.elements.cloud4, {
            left: introPositions.cloud4,
            duration: 2.3,
            ease: "sine.inOut"
        }, "<")
        .to(hero, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out"
        }, "-=1.15")
        .fromTo(".letter:nth-child(1)", {
            x: -120,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            duration: 0.65,
            ease: "power3.out"
        })
        .fromTo(".letter:nth-child(2)", {
            y: -120,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: "power3.out"
        }, "+=0.04")
        .fromTo(".letter:nth-child(3)", {
            x: 120,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            duration: 0.65,
            ease: "power3.out"
        }, "+=0.04")
        .to(gift, {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "sine.out"
        }, "+=0.08")
        .to(name, {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "sine.out"
        }, "+=0.05")
        .to(beginButton, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            ease: "sine.out"
        }, "+=0.08");

    const handleBegin = () => {
        if (beginButton.disabled) {
            return;
        }

        beginButton.disabled = true;
        beginButton.style.pointerEvents = "none";
        envelopeStage.setAttribute("aria-hidden", "false");
        sky.classList.remove("is-ready");

        const arrivalTimeline = scene.createArrivalTimeline();

        arrivalTimeline
            .to(beginButton, {
                opacity: 0,
                y: -10,
                duration: 0.36,
                ease: "sine.inOut"
            })
            .to(gift, {
                opacity: 0,
                y: -10,
                duration: 0.36,
                ease: "sine.inOut"
            }, "<0.08")
            .to(name, {
                opacity: 0,
                y: -12,
                duration: 0.42,
                ease: "sine.inOut"
            }, "<")
            .to(title, {
                scale: 0.82,
                duration: 0.8,
                ease: "power2.inOut"
            }, "-=0.04")
            .to(hero, {
                y: -118,
                duration: 1.05,
                ease: "power2.inOut"
            }, "<0.04")
            .to(scene.getCloudArray(), {
                left: index => scene.getCloudPositions("arrival")[`cloud${index + 1}`],
                duration: 1.5,
                ease: "sine.inOut"
            }, "<0.08")
            .to(sun, {
                y: -24,
                duration: 1.5,
                ease: "sine.inOut"
            }, "<")
            .to(sunGlow, {
                y: -46,
                opacity: 0.72,
                scale: 1.04,
                duration: 1.5,
                ease: "sine.inOut"
            }, "<")
            .add(scene.createEnvelopeDescent(() => {
                envelopeReady = true;
            }), "-=0.62");
    };

    beginButton.addEventListener("click", handleBegin, { once: true });

    const handleEnvelopeOpen = () => {
        if (!envelopeReady || envelopeOpened) {
            return;
        }

        envelopeOpened = true;
        scene.createOpenTimeline();
    };

    envelope.addEventListener("click", handleEnvelopeOpen);
    envelope.addEventListener("keydown", event => {
        if (event.key !== "Enter" && event.key !== " ") {
            return;
        }

        event.preventDefault();
        handleEnvelopeOpen();
    });
});
