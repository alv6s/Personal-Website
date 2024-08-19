gsap.registerPlugin(ScrollTrigger);


document.addEventListener("DOMContentLoaded", function() {
	const positions = {};
    let resizeTimeout; 
	const links = document.querySelectorAll(".sidebar a, .lowerbar a");
	const sections = ["about", "projects", "tools", "contact"];

    // Mapeia as posições das seções
    sections.forEach(section => {
        positions[section] = document.getElementById(section).offsetTop;
    });

	positions['about'] = document.getElementById('about').offsetTop;
    positions['projects'] = document.getElementById('projects').offsetTop;
    positions['tools'] = document.getElementById('tools').offsetTop;
        positions['contact'] = document.getElementById('contact').offsetTop;

	window.addEventListener('resize', () => {
			window.location.reload(); 
	});
    links.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1); // Remove o #

            // Verificar se o ID está no mapeamento
            if (positions[targetId] !== undefined) {
                const targetPosition = positions[targetId];
                const currentScroll = window.scrollY;
                // Usar GSAP para todas as rolagens, tanto para trás quanto para frente
                gsap.to(window, {
                    scrollTo: { y: targetPosition },
                    duration: 1, // Duração da animação em segundos
                    ease: "power2.out",
                    onComplete: () => {
                        // Reativar todos os ScrollTriggers após a rolagem
                        ScrollTrigger.getAll().forEach(trigger => trigger.enable());
                    }
                });
            }
        });
    });

	window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach(section => {
            const sectionTop = positions[section];
            const sectionHeight = document.getElementById(section).clientHeight;
            const scrollY = window.scrollY;

            if (scrollY >= sectionTop - sectionHeight / 3 && scrollY < sectionTop + sectionHeight - sectionHeight / 3) {
                current = section;
            }
        });

        links.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").substring(1) === current) {
                link.classList.add("active");
            }
        });
    });

	const secTextElement = document.getElementById('custom-cursor-area');
    secTextElement.addEventListener('click', function (e) {
        e.preventDefault(); // Impede o comportamento padrão

        // ID do alvo para onde você quer rolar
        const targetId = 'contact';

        // Verifique se o ID está no mapeamento
        if (positions[targetId] !== undefined) {
            const targetPosition = positions[targetId];

            // Use GSAP para rolar suavemente até a posição do alvo
            gsap.to(window, {
                scrollTo: { y: targetPosition },
                duration: 1, // Duração da animação em segundos
                ease: "power2.out",
                onComplete: () => {
                    // Reative todos os ScrollTriggers após a rolagem
                    ScrollTrigger.getAll().forEach(trigger => trigger.enable());
                }
            });
        }
    });



    gsap.registerPlugin(ScrollTrigger);

    const footer = document.querySelector(".footer");
    const lastCard = document.querySelector(".card.scroll");
    const pinnedSections = gsap.utils.toArray(".pinned");

    pinnedSections.forEach((section, index, sections) => {
        let img = section.querySelector(".img");

        let nextSection = sections[index + 1] || lastCard;
        let endScalepoint = `top+=${nextSection.offsetTop - section.offsetTop} top`;

        gsap.to(section, {
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: index === sections.length ? `+=${lastCard.offsetHeight / 2}` : footer.offsetTop - window.innerHeight,
                pin: true,
                pinSpacing: false,
                scrub: 1,
            },
        });

        gsap.fromTo(
            img,
            { scale: 1 },
            {
                scale: 0.5,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: endScalepoint,
                    scrub: 1,
                },
            }
        );
    });

    const heroH1 = document.querySelector(".hero .testando");
    ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "+=400vh",
        scrub: 1,
        onUpdate: (self) => {
            let opacityProgress = self.progress;
            heroH1.style.opacity = 1 - opacityProgress;
        },
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const projectButtons = document.querySelectorAll('.project-button');
    const modal = document.getElementById('project-modal');
    const closeBtn = document.querySelector('.close-btn');
    const modalImage = document.getElementById('modal-image');
    const modalVideo = document.getElementById('modal-video');
    const modalVideoSource = document.getElementById('modal-video-source');
    const modalCaption = document.getElementById('modal-caption');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    // Dados dos projetos (exemplo com múltiplas mídias por projeto)
    const projects = {
        1: [
            { type: 'video', src: 'assets/g1.mov', caption: 'High Fidelity APP " Prototype made in Figma. 2024.' },
            { type: 'image', src: 'assets/another-image.png', caption: 'Another Image Description' }
        ],
        2: [
            { type: 'image', src: 'assets/test.png', caption: 'Project 2 Description' }
        ],
        // Adicione outros projetos com múltiplas mídias aqui
    };

    let currentProject = [];
    let currentIndex = 0;

    function showMedia(index) {
        const media = currentProject[index];
        if (media.type === 'image') {
            modalImage.src = media.src;
            modalImage.style.display = 'block';
            modalVideo.style.display = 'none';
        } else if (media.type === 'video') {
            modalVideoSource.src = media.src;
            modalVideo.style.display = 'block';
            modalImage.style.display = 'none';
            modalVideo.play();
        }
        modalCaption.textContent = media.caption;
    }

    projectButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.getAttribute('data-project');
            currentProject = projects[projectId] || [];
            currentIndex = 0;
            if (currentProject.length > 0) {
                showMedia(currentIndex);
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        modalImage.src = '';
        modalVideoSource.src = '';
        modalVideo.pause();
        modalVideo.currentTime = 0;
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeBtn.click();
        }
    });

    window.addEventListener('scroll', () => {
        if (modal.style.display === 'block') {
            closeBtn.click();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentProject.length > 0) {
            currentIndex = (currentIndex - 1 + currentProject.length) % currentProject.length;
            showMedia(currentIndex);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentProject.length > 0) {
            currentIndex = (currentIndex + 1) % currentProject.length;
            showMedia(currentIndex);
        }
    });
});


const text = document.querySelector(".sec-text");

const textLoad = () => {
	setTimeout(() => {
		text.textContent = "UX/UI Design";
	}, 0);
	setTimeout(() => {
		text.textContent = "Web Development";
	}, 4000);
	setTimeout(() => {
		text.textContent = "3D Modeling";
	}, 8000);
	setTimeout(() => {
		text.textContent = "Image Design";
	}, 12000);
	setTimeout(() => {
		text.textContent = "Front-End";
	}, 16000);
	setTimeout(() => {
		text.textContent = "Mobile Development";
	}, 20000);
	setTimeout(() => {
		text.textContent = "Video/Photo Editing";
	}, 24000);
	setTimeout(() => {
		text.textContent = "VR/AR Development";
	}, 28000);
	}
	textLoad();
	setInterval(textLoad, 32000);

	
document.addEventListener("DOMContentLoaded", function() {
    const customCursor = document.querySelector(".custom-cursor");
    const targetArea = document.getElementById("custom-cursor-area");

    targetArea.addEventListener("mouseenter", () => {
        customCursor.classList.add("show");
    });

    targetArea.addEventListener("mouseleave", () => {
        customCursor.classList.remove("show");
    });

    targetArea.addEventListener("mousemove", (e) => {
        customCursor.style.left = `${e.clientX}px`;
        customCursor.style.top = `${e.clientY}px`;
    });
});

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = positions[section];
        const sectionHeight = document.getElementById(section).clientHeight;
        const scrollY = window.scrollY;

        if (scrollY >= sectionTop - sectionHeight / 3 && scrollY < sectionTop + sectionHeight - sectionHeight / 3) {
            current = section;
        }
    });

    links.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").substring(1) === current) {
            link.classList.add("active");
        }
    });
});




