(function () {
    window.createEndingModule = function createEndingModule(root) {
        const timelineSection = root.querySelector("#timelineSection");
        const videoSection1 = root.querySelector("#videoSection1");
        const videoSection2 = root.querySelector("#videoSection2");
        const video1 = root.querySelector("#video1");
        const video2 = root.querySelector("#video2");
        const finalScene = root.querySelector("#finalScene");
        const screenFlash = root.querySelector(".screen-flash");

        const nextVideoBtn = root.querySelector("#nextVideoBtn");
        const finishBtn = root.querySelector("#finishBtn");

        const finalHeading = root.querySelector(".final-heading");
        const finalName = root.querySelector(".final-name");
        const finalLine1 = root.querySelector(".final-line-1");
        const finalLine2 = root.querySelector(".final-line-2");
        const finalSignature = root.querySelector(".final-signature");

        let isTransitioning = false;

        const initEnding = () => {
            if (videoSection1) gsap.set(videoSection1, { autoAlpha: 0, display: "none" });
            if (videoSection2) gsap.set(videoSection2, { autoAlpha: 0, display: "none" });
            if (finalScene) gsap.set(finalScene, { autoAlpha: 0, display: "none" });

            if (finalHeading) gsap.set(finalHeading, { opacity: 0, y: 16 });
            if (finalName) gsap.set(finalName, { opacity: 0, y: 14 });
            if (finalLine1) gsap.set(finalLine1, { opacity: 0, y: 12 });
            if (finalLine2) gsap.set(finalLine2, { opacity: 0, y: 12 });
            if (finalSignature) gsap.set(finalSignature, { opacity: 0, y: 12 });
        };

        const playVideoSafely = videoEl => {
            if (!videoEl) return;
            videoEl.muted = false;
            videoEl.currentTime = 0;
            const playPromise = videoEl.play();
            if (playPromise !== undefined) {
                playPromise.catch(err => {
                    console.log("Unmuted playback restricted by browser policy; falling back to muted autoplay:", err);
                    videoEl.muted = true;
                    videoEl.play().catch(() => {});
                });
            }
        };

        const startEndingSequence = () => {
            if (isTransitioning) return;
            isTransitioning = true;

            const tl = gsap.timeline({
                defaults: { ease: "power2.inOut" }
            });

            /* Step 1: Timeline finishes -> Final memory fades away */
            tl.to(timelineSection, {
                opacity: 0,
                duration: 1.2
            })
            /* Step 2: Screen gently fades to white */
            .to(screenFlash, {
                opacity: 1,
                duration: 0.9
            }, "-=0.3")
            .add(() => {
                gsap.set(timelineSection, { display: "none" });
                document.body.classList.remove("timeline-active");
                window.scrollTo({ top: 0, behavior: "instant" });
                gsap.set(videoSection1, { display: "flex" });
            })
            /* Step 3: Soft camera flash pulse & Section 1 ("Our Beginning") fades in */
            .to(screenFlash, {
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            })
            .to(videoSection1, {
                autoAlpha: 1,
                duration: 1.0
            }, "-=0.5")
            .add(() => {
                isTransitioning = false;
                playVideoSafely(video1);
            });
        };

        const transitionToVideo2 = () => {
            if (isTransitioning) return;
            isTransitioning = true;

            const tl = gsap.timeline({
                defaults: { ease: "power2.inOut" }
            });

            tl.to(videoSection1, {
                opacity: 0,
                duration: 0.9
            })
            .to(screenFlash, {
                opacity: 0.85,
                duration: 0.6
            }, "-=0.3")
            .add(() => {
                if (video1) video1.pause();
                gsap.set(videoSection1, { display: "none" });
                window.scrollTo({ top: 0, behavior: "instant" });
                gsap.set(videoSection2, { display: "flex" });
            })
            .to(screenFlash, {
                opacity: 0,
                duration: 0.7,
                ease: "power2.out"
            })
            .to(videoSection2, {
                autoAlpha: 1,
                duration: 1.0
            }, "-=0.4")
            .add(() => {
                isTransitioning = false;
                playVideoSafely(video2);
            });
        };

        const transitionToFinalScene = () => {
            if (isTransitioning) return;
            isTransitioning = true;

            const tl = gsap.timeline({
                defaults: { ease: "power2.inOut" }
            });

            tl.to(videoSection2, {
                opacity: 0,
                duration: 1.0
            })
            .to(screenFlash, {
                opacity: 1,
                duration: 0.9
            }, "-=0.4")
            .add(() => {
                if (video2) video2.pause();
                gsap.set(videoSection2, { display: "none" });
                gsap.set(finalScene, { display: "flex" });
                document.body.style.overflow = "hidden";
                window.scrollTo({ top: 0, behavior: "instant" });
            })
            /* Soft transition to dreamy final scene */
            .to(screenFlash, {
                opacity: 0,
                duration: 1.2,
                ease: "sine.out"
            })
            .to(finalScene, {
                autoAlpha: 1,
                duration: 1.2
            }, "-=0.8")
            /* Final Scene Sequential Fade-ins */
            .to([finalHeading, finalName], {
                opacity: 1,
                y: 0,
                duration: 1.6,
                stagger: 0.3,
                ease: "sine.out"
            }, "-=0.2")
            .to({}, { duration: 1.2 })
            .to(finalLine1, {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: "sine.out"
            })
            .to({}, { duration: 1.2 })
            .to(finalLine2, {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: "sine.out"
            })
            .to({}, { duration: 1.2 })
            .to(finalSignature, {
                opacity: 1,
                y: 0,
                duration: 1.6,
                ease: "sine.out",
                onComplete: () => {
                    isTransitioning = false;
                }
            });
        };

        if (nextVideoBtn) {
            nextVideoBtn.addEventListener("click", transitionToVideo2);
        }

        if (finishBtn) {
            finishBtn.addEventListener("click", transitionToFinalScene);
        }

        return {
            initEnding,
            startEndingSequence,
            transitionToVideo2,
            transitionToFinalScene
        };
    };
})();
