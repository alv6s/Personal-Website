gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function() {
	const positions = {};
    let resizeTimeout; 
	const links = document.querySelectorAll(".sidebar a, .lowerbar a");

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
            console.log("Clicked link ID:", targetId);

            // Verificar se o ID está no mapeamento
            if (positions[targetId] !== undefined) {
                const targetPosition = positions[targetId];
                const currentScroll = window.scrollY;
                console.log("Current scroll position:", currentScroll);
                console.log("Target section position:", targetPosition);

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

    const heroH1 = document.querySelector(".hero h1");
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
  
	// Dados dos projetos (exemplo)
	const projects = {
	  1: { type: 'image', src: 'assets/project1.jpg', caption: 'Project 1 Description' },
	  2: { type: 'image', src: 'assets/project2.jpg', caption: 'Project 2 Description' },
	  3: { type: 'video', src: 'assets/project3.mp4', caption: 'Project 3 Description' },
	  4: { type: 'image', src: 'assets/project4.jpg', caption: 'Project 4 Description' },
	  5: { type: 'video', src: 'assets/project5.mp4', caption: 'Project 5 Description' },
	  6: { type: 'image', src: 'assets/project6.jpg', caption: 'Project 6 Description' }
	};
  
	projectButtons.forEach(button => {
	  button.addEventListener('click', () => {
		const projectId = button.getAttribute('data-project');
		const project = projects[projectId];
  
		if (project.type === 'image') {
		  modalImage.src = project.src;
		  modalVideo.style.display = 'none';
		  modalImage.style.display = 'block';
		} else if (project.type === 'video') {
		  modalVideoSource.src = project.src;
		  modalVideo.style.display = 'block';
		  modalImage.style.display = 'none';
		}
  
		modalCaption.textContent = project.caption;
		modal.style.display = 'block';
	  });
	});
  
	closeBtn.addEventListener('click', () => {
	  modal.style.display = 'none';
	  modalImage.src = '';
	  modalVideoSource.src = '';
	});
  
	window.addEventListener('click', (event) => {
	  if (event.target === modal) {
		modal.style.display = 'none';
		modalImage.src = '';
		modalVideoSource.src = '';
	  }
	});
  });
  