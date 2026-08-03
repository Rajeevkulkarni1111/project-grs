(function () {
    window.createTimelineModule = function createTimelineModule(root) {
        const section = root.querySelector("#timelineSection");
        const header = root.querySelector(".timeline-header");
        const cards = root.querySelectorAll(".memory-card");

        const initTimeline = () => {
            if (!section) return;
            gsap.set(section, { autoAlpha: 0, display: "none" });
            gsap.set(header, { opacity: 0, y: 32 });
            gsap.set(cards, { opacity: 0, y: 28 });
        };

        const setupScrollObserver = () => {
            const observerOptions = {
                root: null,
                rootMargin: "50px 0px -5% 0px",
                threshold: 0.05
            };

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
                    }
                });
            }, observerOptions);

            cards.forEach(card => observer.observe(card));
        };

        const revealTimeline = onComplete => {
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

        return {
            initTimeline,
            revealTimeline
        };
    };
})();
