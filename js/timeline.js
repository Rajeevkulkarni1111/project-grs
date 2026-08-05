(function () {
    window.createTimelineModule = function createTimelineModule(root) {
        const section = root.querySelector("#timelineSection");
        const header = root.querySelector(".timeline-header");
        const cards = root.querySelectorAll(".memory-card");
        const continueWrap = root.querySelector(".timeline-action-wrap");
        const continueBtn = root.querySelector("#continueBtn");
        let timelineFinishCallback = null;
        let timelineFinished = false;

        const initTimeline = () => {
            if (!section) return;
            gsap.set(section, { autoAlpha: 0, display: "none" });
            gsap.set(header, { opacity: 0, y: 32 });
            gsap.set(cards, { opacity: 0, y: 28 });
            if (continueWrap) gsap.set(continueWrap, { opacity: 0, y: 20 });
        };

        const triggerFinish = () => {
            if (timelineFinished) return;
            timelineFinished = true;
            if (typeof timelineFinishCallback === "function") {
                timelineFinishCallback();
            }
        };

        const revealContinueButton = () => {
            if (continueWrap) {
                gsap.to(continueWrap, {
                    opacity: 1,
                    y: 0,
                    duration: 0.85,
                    ease: "power2.out"
                });
            }
        };

        const setupScrollObserver = () => {
            const observerOptions = {
                root: null,
                rootMargin: "50px 0px -5% 0px",
                threshold: 0.05
            };

            const lastCard = cards.length > 0 ? cards[cards.length - 1] : null;

            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        gsap.to(entry.target, {
                            opacity: 1,
                            y: 0,
                            duration: 0.85,
                            ease: "power2.out"
                        });
                        obs.unobserve(entry.target);

                        if (lastCard && entry.target === lastCard) {
                            revealContinueButton();
                        }
                    }
                });
            }, observerOptions);

            cards.forEach(card => observer.observe(card));
        };

        if (continueBtn) {
            continueBtn.addEventListener("click", triggerFinish);
        }

        const revealTimeline = (onComplete, onFinish) => {
            if (onFinish) {
                timelineFinishCallback = onFinish;
            }
            if (!section) return;

            document.body.classList.add("timeline-active");

            gsap.set(section, { display: "block" });

            const tl = gsap.timeline({
                defaults: { ease: "power2.out" }
            });

            tl.to(section, {
                autoAlpha: 1,
                duration: 0.8
            })
            .to(header, {
                opacity: 1,
                y: 0,
                duration: 1.1,
                ease: "power3.out"
            }, "-=0.3")
            .add(() => {
                setupScrollObserver();
                if (typeof onComplete === "function") {
                    onComplete();
                }
            }, "-=0.2");

            return tl;
        };

        const setFinishCallback = cb => {
            timelineFinishCallback = cb;
        };

        return {
            initTimeline,
            revealTimeline,
            setFinishCallback
        };
    };
})();
