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

		function isMobile() {
			return window.innerWidth <= 768; // Ajuste o valor conforme sua definição de mobile
		}
		
		// Função que será chamada no redimensionamento
		function handleResize() {
			if (isMobile()) {
				// Lógica para mobile
				clearTimeout(resizeTimeout);
				resizeTimeout = setTimeout(() => {
					// Ajustar qualquer lógica de layout necessário aqui
				}, 250);
			} else {
				// Lógica para desktop
				window.location.reload();
			}
		}
		
		// Adicionar o listener de resize
		window.addEventListener('resize', handleResize);
		

	
    links.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1); // Remove o #

            // Verificar se o ID está no mapeamento
            if (positions[targetId] !== undefined) {
                const targetPosition = positions[targetId];
                const currentScroll = window.scrollY;
                gsap.to(window, {
                    scrollTo: { y: targetPosition },
                    duration: 0.8, // Duração da animação em segundos
                    ease: "power2.inOut",
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
                duration: 0.8, // Duração da animação em segundos
                ease: "power2.inOut",
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
    const introText = document.getElementById('intro-text');

    let currentProject = {};
    let currentIndex = 0;

    // Define os projetos para mobile e desktop
    const mobileProjects = {
        1: {
            media: [
                { type: 'text', text: "This project explored and virtually reconstructed ghost buildings in Porto, preserving them in collective memory through augmented reality (AR). It focused on historic structures like Palacete de Monteiro Moreira, Casa dos Vinte e Quatro, and the original Palácio de Cristal. The project involved developing low and high-fidelity prototypes in Figma and utilized tools such as Adobe Photoshop and Autodesk Maya.<br><br> Additionally, the application was developed using React Native with Expo and TypeScript.<br>The reconstructions aimed to enhance cultural tourism and heritage understanding by offering innovative ways to engage with Porto’s history through 3D modeling and AR." },
                { type: 'video', src: 'assets/project1/g1.mov', caption: '' },
                { type: 'image', src: 'assets/project1/image.png', caption: 'Low-Fidelity prototype - Figma' },
				{ type: 'image', src: 'assets/project1/hf.png', caption: 'High-Fidelity prototype - Figma' },
				{ type: 'image', src: 'assets/project1/se.png', caption: 'Image Research' },
				{ type: 'image', src: 'assets/project1/space.png', caption: '3D Reconstruction of Praça D. Pedro in 1892 ' }
		
            ]
        },
        2: {
            media: [
				{ type: 'text', text: "The game for the \"Skills 4 NextGen\" project aims to enhance communication between deaf students, interpreters, and teachers through an educational dynamic. <br><br>Using Figma, our team developed both low-fidelity and high-fidelity prototypes.<br>The low-fidelity prototype used basic shapes and grayscale to outline the game’s interface, while the high-fidelity prototype featured detailed visuals and interactive elements to closely simulate the final user experience.<br>This iterative process allowed us to refine the game’s design and better achieve its educational goals."},
				{ type: 'video', src: 'assets/project2/game2.mov', caption: 'Student\'s Flow' },
				{ type: 'video', src: 'assets/project2/game1.mov', caption: 'Professor\'s Flow' },
                { type: 'image', src: 'assets/project2/s1.png', caption: 'Wireflows' },
				{ type: 'image', src: 'assets/project2/s2.png', caption: 'Low-Fidelity prototype' },
				{ type: 'image', src: 'assets/project2/s3.png', caption: 'High-Fidelity prototype' },
            ]
        },
		3: {
            media: [
				{ type: 'text', text: "This project is a basic shell program created as a school assignment at 42.<br>It's intended to provide core shell functionalities such as command execution, history management, input/output redirection, and more.<br><br>With a minimalist design, is designed as a learning exercise for working with system calls, processes, and various Unix commands."},
				{ type: 'video', src: 'assets/project3/minishell.mov', caption: '' },
              ]
        },
		4: {
            media: [
				{ type: 'video', src: 'assets/project4/a00.mp4', caption: 'Animation Project - Jumping Rooster'},
				{ type: 'image', src: 'assets/project4/a02.png', caption: 'Jumping Rooster - Character UV\'s and Texture'},
				{ type: 'image', src: 'assets/project4/a03.png', caption: 'Jumping Rooster - Character views'},
				{ type: 'image', src: 'assets/project4/a01.png', caption: 'Jumping Rooster - Video Editing'},
                { type: 'image', src: 'assets/project4/a1.png', caption: 'Praça D. Pedro in 1892 - 3D Reconstruction'},
                { type: 'image', src: 'assets/project4/a2.png', caption: 'Casa dos Vinte e Quatro - 3D Reconstruction'},
				{ type: 'image', src: 'assets/project4/a3.png', caption: 'UV Texture Mapping Example'},
				{ type: 'image', src: 'assets/project4/a4.png', caption: 'Texture Development - Adobe Substance Painter'},
				{ type: 'image', src: 'assets/project4/a5.png', caption: 'Paços do Concelho - 3D Reconstruction'},
				{ type: 'image', src: 'assets/project4/a6.png', caption: 'Palácio de Cristal - 3D Reconstruction'},
				{ type: 'image', src: 'assets/project4/a7.png', caption: 'Render example using Arnold - Paços do Concelho'},
				{ type: 'image', src: 'assets/project4/a8.png', caption: 'Render example using Arnold - Casa dos Vinte e Quatro'},
            ]
        },
		5: {
            media: [
				{ type: 'image', src: 'assets/project5/ENTRA1.png', caption: 'Brand and product design for a wine surprise box, offering a curated experience.'},
				{ type: 'image', src: 'assets/project5/entra2.png', caption: 'Visual identity, ads, and a Shopify site for a wine surprise box project.'},
            ]
        },
		6: {
            media: [
				{ type: 'text', text: "So long involves the development of a basic 2D game as part of the 42 code school curriculum.<br><br>The project focuses on working with textures, sprites, and core gameplay mechanics.<br>It\’s built using the MiniLibX graphical library and includes the implementation of various features like window management, event handling, map rendering, and character movement."},
				{ type: 'video', src: 'assets/project6/solong.mov', caption: ''},
				 ]
        },
        // Adicione outros projetos para mobile aqui
    };

    const desktopProjects = {
        1: {
            media: [
                { type: 'text-video', text: "This project explored and virtually reconstructed ghost buildings in Porto, preserving them in collective memory through augmented reality (AR). It focused on historic structures like Palacete de Monteiro Moreira, Casa dos Vinte e Quatro, and the original Palácio de Cristal. The project involved developing low and high-fidelity prototypes in Figma and utilized tools such as Adobe Photoshop and Autodesk Maya.<br><br> Additionally, the application was developed using React Native with Expo and TypeScript.<br>The reconstructions aimed to enhance cultural tourism and heritage understanding by offering innovative ways to engage with Porto’s history through 3D modeling and AR.", videoSrc: 'assets/project1/g1.mov', caption: '' },
                { type: 'image', src: 'assets/project1/image.png', caption: 'Low-Fidelity prototype' },
				{ type: 'image', src: 'assets/project1/hf.png', caption: 'High-Fidelity prototype' },
				{ type: 'image', src: 'assets/project1/se.png', caption: 'Image Research' },
				{ type: 'image', src: 'assets/project1/space.png', caption: '3D Reconstruction of Praça D. Pedro in 1892 ' },
			
			]
        },
        2: {
            media: [
                { type: 'text-video', text: "The game for the \"Skills 4 NextGen\" project aims to enhance communication between deaf students, interpreters, and teachers through an educational dynamic. <br><br>Using Figma, our team developed both low-fidelity and high-fidelity prototypes.<br>The low-fidelity prototype used basic shapes and grayscale to outline the game’s interface, while the high-fidelity prototype featured detailed visuals and interactive elements to closely simulate the final user experience.<br>This iterative process allowed us to refine the game’s design and better achieve its educational goals.", videoSrc: 'assets/project2/game2.mov', caption: ''},
                { type: 'video', src: 'assets/project2/game1.mov', caption: 'Professor\'s Flow' },
                { type: 'image', src: 'assets/project2/s1.png', caption: 'Wireflows' },
				{ type: 'image', src: 'assets/project2/s2.png', caption: 'Low-Fidelity prototype' },
				{ type: 'image', src: 'assets/project2/s3.png', caption: 'High-Fidelity prototype' },
            ]
        },
		3: {
            media: [
                { type: 'text-video', text: "This project is a basic shell program created as a school assignment at 42.<br>It's intended to provide core shell functionalities such as command execution, history management, input/output redirection, and more.<br><br>With a minimalist design, is designed as a learning exercise for working with system calls, processes, and various Unix commands.", videoSrc: 'assets/project3/minishell.mov', caption: ''},
            ]
        },
		4: {
            media: [
				{ type: 'video', src: 'assets/project4/a00.mp4', caption: 'Animation Project - Jumping Rooster'},
				{ type: 'image', src: 'assets/project4/a02.png', caption: 'Jumping Rooster - Character UV\'s and Texture'},
				{ type: 'image', src: 'assets/project4/a03.png', caption: 'Jumping Rooster - Character views'},
				{ type: 'image', src: 'assets/project4/a01.png', caption: 'Jumping Rooster - Video Editing'},
                { type: 'image', src: 'assets/project4/a1.png', caption: 'Praça D. Pedro in 1892 - 3D Reconstruction'},
                { type: 'image', src: 'assets/project4/a2.png', caption: 'Casa dos Vinte e Quatro - 3D Reconstruction'},
				{ type: 'image', src: 'assets/project4/a3.png', caption: 'UV Texture Mapping Example'},
				{ type: 'image', src: 'assets/project4/a4.png', caption: 'Texture Development - Adobe Substance Painter'},
				{ type: 'image', src: 'assets/project4/a5.png', caption: 'Paços do Concelho - 3D Reconstruction'},
				{ type: 'image', src: 'assets/project4/a6.png', caption: 'Palácio de Cristal - 3D Reconstruction'},
				{ type: 'image', src: 'assets/project4/a7.png', caption: 'Render example using Arnold - Paços do Concelho'},
				{ type: 'image', src: 'assets/project4/a8.png', caption: 'Render example using Arnold - Casa dos Vinte e Quatro'},
            ]
        },
		5: {
            media: [
				{ type: 'image', src: 'assets/project5/ENTRA1.png', caption: 'Brand and product design for a wine surprise box, offering a curated experience.'},
				{ type: 'image', src: 'assets/project5/entra2.png', caption: 'Visual identity, ads, and a Shopify site for a wine surprise box project.'},
            ]
        },
		6: {
            media: [
				{ type: 'text-video', text: "So long involves the development of a basic 2D game as part of the 42 code school curriculum.<br><br>The project focuses on working with textures, sprites, and core gameplay mechanics.<br>It\’s built using the MiniLibX graphical library and includes the implementation of various features like window management, event handling, map rendering, and character movement.", videoSrc: 'assets/project6/solong.mov', caption: ''},
			]
        },
        // Adicione outros projetos para desktop aqui
    };

    function getProjects() {
        return window.innerWidth <= 768 ? mobileProjects : desktopProjects;
    }

    function showMedia(index) {
        const isMobile = window.innerWidth <= 768;
        const itemsPerPage = isMobile ? 1 : 1; // Exibe 1 item por página

        // Limpa a exibição atual
        modalImage.style.display = 'none';
        modalVideo.style.display = 'none';
        introText.style.display = 'none';

        // Pausa o vídeo anterior e limpa o source
        modalVideo.pause();
        modalVideoSource.src = '';
        modalVideo.load();

        // Calcula o índice máximo permitido
        const media = currentProject.media[index];
        if (media) {
            if (media.type === 'image') {
                modalImage.src = media.src;
                modalImage.style.display = 'block';
            } else if (media.type === 'video') {
                modalVideoSource.src = media.src;
                modalVideo.style.display = 'block';
                modalVideo.play();
                modalVideo.loop = true;
				modalVideo.controlsList = 'nodownload';
                modalVideo.controls = false;
                modalVideo.muted = false;
            } else if (media.type === 'text') {
                introText.innerHTML = `<p>${media.text}</p>`;
                introText.style.display = 'block';
            } else if (media.type === 'text-image') {
                introText.innerHTML = `<p>${media.text}</p>`;
                introText.style.display = 'block';
                modalImage.src = media.imageSrc;
                modalImage.style.display = 'block';
            } else if (media.type === 'text-video') {
                introText.innerHTML = `<p>${media.text}</p>`;
                introText.style.display = 'block';
                modalVideoSource.src = media.videoSrc;
                modalVideo.style.display = 'block';
                modalVideo.play();
                modalVideo.loop = true;
                modalVideo.controls = false;
                modalVideo.muted = false;
            }
            modalCaption.textContent = media.caption || '';
        }

        updateNavigationButtons();
    }

    function updateNavigationButtons() {
        const isMobile = window.innerWidth <= 768;
        const itemsPerPage = isMobile ? 1 : 1;

        prevBtn.style.display = currentIndex === 0 ? 'none' : 'block';
        nextBtn.style.display = (currentIndex + itemsPerPage >= currentProject.media.length) ? 'none' : 'block';
    }

    projectButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.getAttribute('data-project');
            currentProject = getProjects()[projectId] || {};
            currentIndex = 0;
            if (currentProject.media && currentProject.media.length > 0) {
                showMedia(currentIndex);
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        modalImage.src = '';
        modalVideo.pause();
        modalVideoSource.src = '';
        modalVideo.load();
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
        if (currentProject.media && currentProject.media.length > 0) {
            currentIndex = Math.max(0, currentIndex - 1);
            showMedia(currentIndex);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentProject.media && currentProject.media.length > 0) {
            currentIndex = Math.min(currentProject.media.length - 1, currentIndex + 1);
            showMedia(currentIndex);
        }
    });

    window.addEventListener('resize', () => {
        showMedia(currentIndex);
        updateNavigationButtons();
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




