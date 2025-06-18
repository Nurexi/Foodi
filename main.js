// Enhanced Restaurant Website JavaScript
class RestaurantWebsite {
    constructor() {
        this.currentTestimonial = 0;
        this.isScrolling = false;
        this.favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        this.cart = JSON.parse(localStorage.getItem("cart") || "[]");
        this.currentCategory = "all";

        // Menu items data for quick view
        this.menuItems = {
            "Special Burger": {
                title: "Special Burger",
                image: "Classic Combo.jpg",
                rating: 4.9,
                price: "$22.00",
                description: "Our signature dish featuring handmade meatballs with premium ground beef, served over al dente spaghetti with our rich, slow-simmered marinara sauce and fresh basil. A timeless classic that brings comfort and satisfaction to every bite."
            },
            "Special Pizza": {
                title: "Special Pizza",
                image: "Delicious Pizza.jpg",
                rating: 4.8,
                price: "$32.00",
                description: "Fresh Atlantic salmon grilled to perfection, served with roasted asparagus, wild rice pilaf, and our house-made lemon herb butter sauce. A perfect balance of flavors and nutrition that showcases the natural taste of premium seafood."
            },
            "Special Kabobs": {
                title: "Special Kabobs",
                image: "Beef and Vegetable Kabobs with Lemon Herb Marinade(1).jpg",
                rating: 5.0,
                price: "$65.00",
                description: "Premium Wagyu beef tenderloin, perfectly grilled and served with roasted fingerling potatoes, seasonal vegetables, and our signature red wine reduction sauce. An exceptional dining experience for the most discerning palates."
            },
            "Pasta Puttanesca": {
                title: "Pasta Puttanesca",
                image: "Pasta Puttanesca.jpg",
                rating: 4.7,
                price: "$28.00",
                description: "Creamy Arborio rice slowly cooked with wild mushrooms, finished with black truffle oil, Parmesan cheese, and fresh herbs. A luxurious comfort food experience that embodies the essence of Italian cuisine."
            },
            "Crusted Lamb": {
                title: "Crusted Lamb",
                image: "jpg(12).jpg",
                rating: 4.8,
                price: "$45.00",
                description: "Tender lamb rack crusted with fresh herbs and garlic, served with roasted root vegetables and mint jus. A sophisticated dish that celebrates the natural flavors of premium lamb with aromatic herb enhancement."
            },
            "Roasted Chicken": {
                title: "Roasted Chicken",
                image: "How to Make My Grandmother's Roast Chicken with Garlic & ….jpg",
                rating: 4.9,
                price: "$58.00",
                description: "Slow-cooked duck leg confit with crispy skin, served with garlic mashed potatoes and cherry gastrique. A traditional French technique that ensures incredibly tender meat with complex, rich flavors."
            },
            "Grilled Salmon": {
                title: "Grilled Salmon",
                image: "5 Ingredient Marinated Grilled Salmon.jpg",
                rating: 4.6,
                price: "$38.00",
                description: "Traditional Spanish paella with saffron-infused rice, fresh seafood including shrimp, mussels, and calamari. A vibrant dish that brings the authentic taste of Valencia to your table."
            },
            "Special Tacos": {
                title: "Special Tacos",
                image: "🌮🔥 Spicy Garlic Butter Birria Tacos_ A Flavor Explosion! 🧄🧈_Get ready to savor the taco experience of a lifetime! These Spicy Garlic Butter Birria Tacos are a next-level combination of tender, slow-cooked beef, crispy.jpg",
                rating: 4.7,
                price: "$42.00",
                description: "Flaky puff pastry filled with roasted vegetables, mushroom duxelles, and herbs, served with red wine jus. A sophisticated vegetarian option that doesn't compromise on flavor or presentation."
            },
            "Chicken Wraps": {
                title: "Chicken Wraps",
                image: "🌯 Spiced Chicken Wraps with Creamy Mayo & Chilli Sauce 🔥🥗__Perfectly marinated, juicy chicken thighs wrapped in warm tortillas with crunchy cabbage and spring onions, finished off with a drizzle of mayo and your favori.jpg",
                rating: 4.5,
                price: "$26.00",
                description: "Toasted artisan bread topped with truffle cream, wild mushrooms, and fresh herbs. An elegant start to your meal that showcases the earthy luxury of truffles."
            },
            "Raw Meat (ጥሬ ስጋ)": {
                title: "Raw Meat (ጥሬ ስጋ)",
                image: "Ethiopian traditional food.jpg",
                rating: 4.7,
                price: "$14.00",
                description: "Thinly sliced fresh fish with citrus vinaigrette, capers, and microgreens. A light and refreshing appetizer that highlights the quality of our fresh seafood."
            },
            "Mahiberawi (ማህበራዊ)": {
                title: "Mahiberawi (ማህበራዊ)",
                image: "🦋 spammydollz 🦋.jpg",
                rating: 4.8,
                price: "$18.00",
                description: "Selection of premium artisan cheeses served with honey, nuts, and seasonal fruits. Perfect for sharing and exploring different flavor profiles."
            },
            "Shiro (ሽሮ)": {
                title: "Shiro (ሽሮ)",
                image: "ሺሮ, በያይነቱ- Ethiopian food 🥘🇪🇹.jpg",
                rating: 4.6,
                price: "$10.00",
                description: "Decadent chocolate cake with a molten center, served warm with vanilla bean ice cream and fresh berries. Pure indulgence for chocolate lovers."
            },
            "Quanta Firfir (ቋንጣ ፍርፍር)": {
                title: "Quanta Firfir (ቋንጣ ፍርፍር)",
                image: "jpg(26).jpg",
                rating: 4.7,
                price: "$20.00",
                description: "Classic French custard with a caramelized sugar crust, infused with vanilla bean. A timeless dessert that never fails to impress."
            },
            "Tihlo(ጥሕሎ)": {
                title: "Tihlo(ጥሕሎ)",
                image: "Tihlo(ጥሕሎ) Tihlo (ጥሕሎ) is a traditional Ethiopian dish, particularly popular in the Tigray region_ It is made primarily from roasted barley flour (besso) mixed with water to form a dough. This dough is then rolled into sm.jpg",
                rating: 4.8,
                price: "$15.00",
                description: "Traditional Italian dessert with coffee-soaked ladyfingers, mascarpone cream, and cocoa powder. A perfect ending to any Italian meal."
            },
            "Tibs (ጥብስ)": {
                title: "Tibs (ጥብስ)",
                image: "Special tibs (marinated beef) with injera.jpg",
                rating: 4.5,
                price: "$16.00",
                description: "Carefully curated selection of vintage wines from renowned vineyards. Our sommelier will help you find the perfect pairing for your meal."
            },
            "Doro Wat (ዶሮ)": {
                title: "Doro Wat (ዶሮ)",
                image: "Nationalgericht Äthiopien_ Doro Wat (Rezept).jpg",
                rating: 4.9,
                price: "$24.00",
                description: "House-crafted cocktail with premium spirits, fresh ingredients, and creative presentation. Each cocktail is a work of art in itself."
            },
            "Kitfo (ክትፎ)": {
                title: "Kitfo (ክትፎ)",
                image: "Dorowat.jpg",
                rating: 4.6,
                price: "$18.00",
                description: "Single-origin coffee beans expertly roasted and brewed to perfection. A rich and aromatic experience for coffee connoisseurs."
            },
            "Beyaynet (በየአይነት)": {
                title: "Beyaynet (በየአይነት)",
                image: "Savoring the flavors of Ethiopia! Wat, a spicy stew made with tender meat and aromatic spices, served with a side of Injera, a traditional sourdough flatbread_ A delicious and authentic Ethiopian culinary experience.jpg",
                rating: 4.7,
                price: "$14.00",
                description: "Single-origin coffee beans expertly roasted and brewed to perfection. A rich and aromatic experience for coffee connoisseurs."
            }
        };

        this.init();
    }

    init() {
        this.initializeAOS();
        this.handleLoadingScreen();
        this.setupEventListeners();
        this.initializeComponents();
        this.loadFavorites();
        this.preloadImages();
        this.setupPopularCategories();
    }

    initializeAOS() {
        const AOS = window.AOS; // Declare the AOS variable
        if (typeof AOS !== "undefined") {
            AOS.init({
                duration: 400, // faster appearance (default is 1200)
            });
        }
    }

    handleLoadingScreen() {
        const loadingScreen = document.getElementById("loading-screen");
        const minLoadTime = 2500;
        const startTime = Date.now();

        const hideLoading = () => {
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, minLoadTime - elapsedTime);

            setTimeout(() => {
                if (loadingScreen) {
                    loadingScreen.classList.add("hidden");
                    document.body.classList.add("loaded");
                    this.animateHeroElements();
                }
            }, remainingTime);
        };

        if (document.readyState === "complete") {
            hideLoading();
        } else {
            window.addEventListener("load", hideLoading);
        }
    }

    animateHeroElements() {
        const heroElements = document.querySelectorAll(".hero-content > *");
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = "1";
                element.style.transform = "translateY(0)";
            }, index * 150);
        });
    }

    setupEventListeners() {
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupFormHandlers();
        this.setupInteractiveElements();
        this.setupModalHandlers();
        this.setupResizeHandlers();
    }

    setupNavigation() {
        const navbar = document.getElementById("navbar");
        const hamburger = document.getElementById("hamburger");
        const navMenu = document.getElementById("nav-menu");
        const navLinks = document.querySelectorAll(".nav-link");

        // Navbar scroll effect
        let lastScrollY = window.scrollY;
        const handleScroll = this.throttle(() => {
            const currentScrollY = window.scrollY;

            if (navbar) {
                if (currentScrollY > 50) {
                    navbar.classList.add("scrolled");
                } else {
                    navbar.classList.remove("scrolled");
                }

                // Hide/show navbar on scroll direction
                if (currentScrollY > lastScrollY && currentScrollY > 100) {
                    navbar.style.transform = "translateY(-100%)";
                } else {
                    navbar.style.transform = "translateY(0)";
                }
            }

            lastScrollY = currentScrollY;
        }, 10);

        window.addEventListener("scroll", handleScroll);

        // Mobile menu toggle
        if (hamburger && navMenu) {
            hamburger.addEventListener("click", () => {
                const isActive = hamburger.classList.contains("active");

                hamburger.classList.toggle("active");
                navMenu.classList.toggle("active");
                document.body.classList.toggle("no-scroll");

                if (!isActive) {
                    // Animate menu items in
                    navLinks.forEach((link, index) => {
                        link.style.opacity = "0";
                        link.style.transform = "translateY(20px)";
                        setTimeout(() => {
                            link.style.opacity = "1";
                            link.style.transform = "translateY(0)";
                            link.style.transition = "all 0.3s ease";
                        }, index * 100);
                    });
                }
            });
        }

        // Close mobile menu on link click
        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                if (hamburger && navMenu) {
                    hamburger.classList.remove("active");
                    navMenu.classList.remove("active");
                    document.body.classList.remove("no-scroll");
                }
            });
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener("click", (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute("href");
                const target = document.querySelector(targetId);

                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: "smooth",
                    });
                }
            });
        });
    }

    setupScrollEffects() {
        // Scroll to top button
        const scrollToTopBtn = document.getElementById("scroll-to-top");

        const handleScrollToTop = this.throttle(() => {
            if (scrollToTopBtn) {
                if (window.scrollY > 300) {
                    scrollToTopBtn.classList.add("visible");
                } else {
                    scrollToTopBtn.classList.remove("visible");
                }
            }
        }, 100);

        window.addEventListener("scroll", handleScrollToTop);

        if (scrollToTopBtn) {
            scrollToTopBtn.addEventListener("click", () => {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
            });
        }

        // Parallax effects
        this.setupParallaxEffects();

        // Counter animations
        this.setupCounterAnimations();
    }

    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll("[data-speed]");

        if (parallaxElements.length > 0) {
            const handleParallax = this.throttle(() => {
                const scrolled = window.pageYOffset;

                parallaxElements.forEach((element) => {
                    const speed = Number.parseFloat(element.dataset.speed) || 0.5;
                    const yPos = -(scrolled * speed);
                    element.style.transform = `translateY(${yPos}px)`;
                });
            }, 10);

            window.addEventListener("scroll", handleParallax);
        }

        // Mouse parallax for hero image
        const heroImage = document.querySelector(".hero-main-img");
        if (heroImage) {
            document.addEventListener("mousemove", (e) => {
                const { clientX, clientY } = e;
                const { innerWidth, innerHeight } = window;

                const xPos = (clientX / innerWidth - 0.5) * 20;
                const yPos = (clientY / innerHeight - 0.5) * 20;

                heroImage.style.transform = `translate(${xPos}px, ${yPos}px) scale(1.05)`;
            });
        }
    }

    setupCounterAnimations() {
        const counters = document.querySelectorAll(".stat-number");
        const observerOptions = {
            threshold: 0.7,
            rootMargin: "0px 0px -100px 0px",
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        counters.forEach((counter) => {
            counterObserver.observe(counter);
        });
    }

    animateCounter(element) {
        const target = Number.parseInt(element.textContent.replace(/\D/g, ""));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            const suffix = element.textContent.replace(/[\d.]/g, "");
            element.textContent = Math.floor(current) + suffix;
        }, 16);
    }

    setupFormHandlers() {
        // Reservation form
        const reservationForm = document.getElementById("reservation-form");
        if (reservationForm) {
            reservationForm.addEventListener("submit", (e) => {
                e.preventDefault();
                this.handleReservationSubmit(reservationForm);
            });
        }

        // Newsletter form
        const newsletterForm = document.getElementById("newsletter-form");
        if (newsletterForm) {
            newsletterForm.addEventListener("submit", (e) => {
                e.preventDefault();
                this.handleNewsletterSubmit(newsletterForm);
            });
        }

        // Contact form
        const contactForm = document.getElementById("contact-form");
        if (contactForm) {
            contactForm.addEventListener("submit", (e) => {
                e.preventDefault();
                this.handleContactSubmit(contactForm);
            });
        }

        // Form validation and enhancement
        this.enhanceFormInputs();
    }

    enhanceFormInputs() {
        const inputs = document.querySelectorAll("input, textarea, select");

        inputs.forEach((input) => {
            // Add floating label effect
            input.addEventListener("focus", () => {
                input.parentElement.classList.add("focused");
            });

            input.addEventListener("blur", () => {
                if (!input.value) {
                    input.parentElement.classList.remove("focused");
                }
            });

            // Real-time validation
            input.addEventListener("input", () => {
                this.validateInput(input);
            });
        });

        // Set minimum date for reservation
        const dateInput = document.getElementById("date");
        if (dateInput) {
            const today = new Date().toISOString().split("T")[0];
            dateInput.min = today;
        }
    }

    validateInput(input) {
        const value = input.value.trim();
        const type = input.type;
        let isValid = true;
        let message = "";

        switch (type) {
            case "email":
                isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                message = isValid ? "" : "Please enter a valid email address";
                break;
            case "tel":
                isValid = /^[\d\s\-+$$$$]+$/.test(value) && value.length >= 10;
                message = isValid ? "" : "Please enter a valid phone number";
                break;
            case "text":
                if (input.name === "name") {
                    isValid = value.length >= 2;
                    message = isValid ? "" : "Name must be at least 2 characters";
                }
                break;
        }

        // Update UI based on validation
        const errorElement = input.parentElement.querySelector(".error-message");
        if (errorElement) {
            errorElement.textContent = message;
        } else if (message) {
            const error = document.createElement("span");
            error.className = "error-message";
            error.textContent = message;
            error.style.color = "#ef4444";
            error.style.fontSize = "0.875rem";
            error.style.marginTop = "0.25rem";
            input.parentElement.appendChild(error);
        }

        input.classList.toggle("invalid", !isValid);
        input.classList.toggle("valid", isValid && value);

        return isValid;
    }

    handleReservationSubmit(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Validate all fields
        const inputs = form.querySelectorAll("input[required], select[required]");
        let isValid = true;

        inputs.forEach((input) => {
            if (!this.validateInput(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            this.showNotification("Please correct the errors in the form", "error");
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Booking...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

            // Show success message
            this.showNotification(
                "Reservation request submitted successfully! We'll contact you within 15 minutes.",
                "success"
            );

            // Reset form
            form.reset();

            // Store reservation data
            const reservations = JSON.parse(localStorage.getItem("reservations")) || [];
            reservations.push({
                ...data,
                id: Date.now(),
                status: "pending",
                createdAt: new Date().toISOString(),
            });
            localStorage.setItem("reservations", JSON.stringify(reservations));
        }, 2000);
    }

    handleNewsletterSubmit(form) {
        const email = form.querySelector('input[type="email"]').value;

        if (!this.validateInput(form.querySelector('input[type="email"]'))) {
            return;
        }

        const submitBtn = form.querySelector("button");
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i>';
            this.showNotification("Successfully subscribed to newsletter!", "success");

            // Store subscription
            const subscriptions = JSON.parse(localStorage.getItem("subscriptions")) || [];
            subscriptions.push({
                email,
                subscribedAt: new Date().toISOString(),
            });
            localStorage.setItem("subscriptions", JSON.stringify(subscriptions));

            form.reset();

            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }, 1500);
    }

    handleContactSubmit(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

            this.showNotification("Message sent successfully! We'll get back to you soon.", "success");

            form.reset();

            // Store contact message
            const messages = JSON.parse(localStorage.getItem("messages")) || [];
            messages.push({
                ...data,
                id: Date.now(),
                createdAt: new Date().toISOString(),
            });
            localStorage.setItem("messages", JSON.stringify(messages));
        }, 2000);
    }

    setupInteractiveElements() {
        // Menu item interactions
        this.setupMenuInteractions();

       
        
        // Testimonial slider
        this.setupTestimonialSlider();

        // Favorite functionality
        this.setupFavoriteSystem();

        // Quick view functionality
        this.setupQuickView();
    }

    setupMenuInteractions() {
        const menuItems = document.querySelectorAll(".menu-item");

        menuItems.forEach((item) => {
            // Hover effects
            item.addEventListener("mouseenter", () => {
                item.style.transform = "translateY(-10px) scale(1.02)";
                item.style.boxShadow = "0 20px 40px rgba(0,0,0,0.15)";
            });

            item.addEventListener("mouseleave", () => {
                item.style.transform = "translateY(0) scale(1)";
                item.style.boxShadow = "";
            });

            // Click for quick view
            item.addEventListener("click", (e) => {
                if (!e.target.closest("button")) {
                    const itemId = item.dataset.itemId;
                    if (itemId && this.menuItems[itemId]) {
                        this.showQuickView(itemId);
                    }
                }
            });
        });

        // Menu category filtering
        this.setupMenuFiltering();
    }

    setupMenuFiltering() {
        const menuTabs = document.querySelectorAll(".menu-tab");
        const menuSections = document.querySelectorAll(".category-section");

        menuTabs.forEach((tab) => {
            tab.addEventListener("click", () => {
                const category = tab.dataset.category;

                // Update active tab
                menuTabs.forEach((t) => t.classList.remove("active"));
                tab.classList.add("active");

                // Show/hide sections
                menuSections.forEach((section) => {
                    if (category === "all" || section.classList.contains(category)) {
                        section.classList.add("active");
                        section.style.display = "block";
                    } else {
                        section.classList.remove("active");
                        section.style.display = "none";
                    }
                });

                // Animate items
                const visibleItems = document.querySelectorAll(".category-section.active .menu-item");
                visibleItems.forEach((item, index) => {
                    item.style.opacity = "0";
                    item.style.transform = "translateY(20px)";
                    setTimeout(() => {
                        item.style.opacity = "1";
                        item.style.transform = "translateY(0)";
                        item.style.transition = "all 0.3s ease";
                    }, index * 100);
                });
            });
        });
    }

   

       

    setupTiltEffect() {
        const tiltElements = document.querySelectorAll("[data-tilt]");

        tiltElements.forEach((element) => {
            element.addEventListener("mousemove", (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            });

            element.addEventListener("mouseleave", () => {
                element.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
            });
        });
    }

    setupTestimonialSlider() {
        const slides = document.querySelectorAll(".testimonial-slide");
        const prevBtn = document.getElementById("prev-testimonial");
        const nextBtn = document.getElementById("next-testimonial");

        if (slides.length === 0) return;

        const showSlide = (index) => {
            slides.forEach((slide, i) => {
                slide.classList.toggle("active", i === index);
            });
        };

        const nextSlide = () => {
            this.currentTestimonial = (this.currentTestimonial + 1) % slides.length;
            showSlide(this.currentTestimonial);
        };

        const prevSlide = () => {
            this.currentTestimonial = (this.currentTestimonial - 1 + slides.length) % slides.length;
            showSlide(this.currentTestimonial);
        };

        if (nextBtn) nextBtn.addEventListener("click", nextSlide);
        if (prevBtn) prevBtn.addEventListener("click", prevSlide);

        // Auto-advance testimonials
        setInterval(nextSlide, 5000);

        // Touch/swipe support
        let startX = 0;
        let endX = 0;

        const slider = document.querySelector(".testimonial-slider");
        if (slider) {
            slider.addEventListener("touchstart", (e) => {
                startX = e.touches[0].clientX;
            });

            slider.addEventListener("touchend", (e) => {
                endX = e.changedTouches[0].clientX;
                const diff = startX - endX;

                if (Math.abs(diff) > 50) {
                    if (diff > 0) {
                        nextSlide();
                    } else {
                        prevSlide();
                    }
                }
            });
        }
    }

    setupFavoriteSystem() {
        document.addEventListener("click", (e) => {
            if (e.target.closest(".favorite-btn")) {
                e.preventDefault();
                e.stopPropagation();
                const btn = e.target.closest(".favorite-btn");
                const itemId = btn.dataset.itemId;

                this.toggleFavorite(itemId, btn);
            }
        });
    }

    toggleFavorite(itemId, btn) {
        const isFavorite = this.favorites.includes(itemId);

        if (isFavorite) {
            this.favorites = this.favorites.filter((id) => id !== itemId);
            btn.classList.remove("active");
            btn.innerHTML = '<i class="far fa-heart"></i>';
            this.showNotification("Removed from favorites", "info");
        } else {
            this.favorites.push(itemId);
            btn.classList.add("active");
            btn.innerHTML = '<i class="fas fa-heart"></i>';
            this.showNotification("Added to favorites", "success");

            // Animate heart
            btn.style.transform = "scale(1.3)";
            setTimeout(() => {
                btn.style.transform = "scale(1)";
            }, 200);
        }

        localStorage.setItem("favorites", JSON.stringify(this.favorites));
    }

    loadFavorites() {
        const favoriteButtons = document.querySelectorAll(".favorite-btn");
        favoriteButtons.forEach((btn) => {
            const itemId = btn.dataset.itemId;
            if (this.favorites.includes(itemId)) {
                btn.classList.add("active");
                btn.innerHTML = '<i class="fas fa-heart"></i>';
            }
        });
    }

    setupQuickView() {
        // Quick view modal will be created dynamically
        document.addEventListener("click", (e) => {
            if (e.target.closest(".quick-view-btn")) {
                e.preventDefault();
                e.stopPropagation();
                const btn = e.target.closest(".quick-view-btn");
                const itemId = btn.dataset.itemId;
                this.showQuickView(itemId);
            }
        });
    }

    showQuickView(itemId) {
        const item = this.menuItems[itemId];
        if (!item) return;

        const modal = document.createElement("div");
        modal.className = "modal quick-view-modal";
        modal.innerHTML = `
            <div class="modal-content quick-view-content">
                <button class="modal-close" aria-label="Close quick view">
                    <i class="fas fa-times"></i>
                </button>
                <div class="quick-view-body">
                    <div class="quick-view-image">
                        <img src="${item.image}" alt="${item.title}" loading="lazy">
                        <button class="favorite-btn ${this.favorites.includes(itemId) ? "active" : ""}" data-item-id="${itemId}">
                            <i class="fa${this.favorites.includes(itemId) ? "s" : "r"} fa-heart"></i>
                        </button>
                    </div>
                    <div class="quick-view-details">
                        <h3>${item.title}</h3>
                        <div class="item-rating">
                            <div class="stars">
                                ${this.generateStars(item.rating)}
                            </div>
                            <span class="rating-text">(${item.rating})</span>
                        </div>
                        <p class="item-description">${item.description}</p>
                        <div class="item-price">${item.price}</div>
                        <div class="item-actions">
                            <button class="action-btn add-to-cart-btn" data-item-name="${item.title}" data-item-price="${item.price}" data-item-image="${item.image}">
                                <i class="fas fa-shopping-cart"></i>
                                <span>Add to Cart</span>
                            </button>
                            <button class="action-btn order-now-btn" data-item-name="${item.title}" data-item-price="${item.price}" data-item-image="${item.image}">
                                <i class="fas fa-bolt"></i>
                                <span>Order Now</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        document.body.classList.add("no-scroll");

        // Animate in
        setTimeout(() => {
            modal.classList.add("active");
        }, 10);

        // Close handlers
        const closeBtn = modal.querySelector(".modal-close");
        closeBtn.addEventListener("click", () => this.closeModal(modal));

        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                this.closeModal(modal);
            }
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                this.closeModal(modal);
            }
        });
    }

    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let stars = "";

        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }

        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }

        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }

        return stars;
    }

    closeModal(modal) {
        modal.classList.remove("active");
        document.body.classList.remove("no-scroll");

        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }

    setupModalHandlers() {
        // Order modal
        const orderNowBtn = document.getElementById("order-now-btn");
        const orderModal = document.getElementById("order-modal");
        const closeOrderModal = document.getElementById("close-order-modal");

        if (orderNowBtn && orderModal) {
            orderNowBtn.addEventListener("click", () => {
                orderModal.classList.add("active");
                document.body.classList.add("no-scroll");
            });
        }

        if (closeOrderModal && orderModal) {
            closeOrderModal.addEventListener("click", () => {
                orderModal.classList.remove("active");
                document.body.classList.remove("no-scroll");
            });
        }

        // Video modal
        const watchVideoBtn = document.getElementById("watch-video-btn");
        const videoModal = document.getElementById("video-modal");
        const closeVideoModal = document.getElementById("close-video-modal");

        if (watchVideoBtn && videoModal) {
            watchVideoBtn.addEventListener("click", () => {
                videoModal.classList.add("active");
                document.body.classList.add("no-scroll");
            });
        }

        if (closeVideoModal && videoModal) {
            closeVideoModal.addEventListener("click", () => {
                videoModal.classList.remove("active");
                document.body.classList.remove("no-scroll");
            });
        }

        // Close modals on outside click
        document.addEventListener("click", (e) => {
            if (e.target.classList.contains("modal")) {
                e.target.classList.remove("active");
                document.body.classList.remove("no-scroll");
            }
        });

        // Close modals on escape key
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                const activeModal = document.querySelector(".modal.active");
                if (activeModal) {
                    activeModal.classList.remove("active");
                    document.body.classList.remove("no-scroll");
                }
            }
        });
    }

    setupResizeHandlers() {
        let resizeTimer;
        window.addEventListener("resize", () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
    }

    handleResize() {
        // Recalculate any size-dependent elements
        const heroImage = document.querySelector(".hero-main-img");
        if (heroImage) {
            heroImage.style.transform = "translate(0, 0) scale(1)";
        }

        // Reset any mobile menu states
        const hamburger = document.getElementById("hamburger");
        const navMenu = document.getElementById("nav-menu");

        if (window.innerWidth > 768) {
            if (hamburger) hamburger.classList.remove("active");
            if (navMenu) navMenu.classList.remove("active");
            document.body.classList.remove("no-scroll");
        }
    }

    initializeComponents() {
        // Initialize any third-party components or plugins here
        this.setupImageLazyLoading();
        this.setupIntersectionObserver();
    }

    setupImageLazyLoading() {
        const images = document.querySelectorAll("img[loading='lazy']");
        
        if ("IntersectionObserver" in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove("lazy");
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach((img) => {
                imageObserver.observe(img);
            });
        }
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px",
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in-view");
                }
            });
        }, observerOptions);

        // Observe elements that should animate on scroll
        const animateElements = document.querySelectorAll(".menu-item, .service-card, .gallery-item");
        animateElements.forEach((el) => {
            observer.observe(el);
        });
    }

    preloadImages() {
        const criticalImages = [
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Classic%20Spaghetti%20and%20Meatballs%20Recipe.jpg-mP7Md4mDGwzcNRUgTUIX5UsiV5FFxN.jpeg",
            "shef.jpg",
            "Classic Combo.jpg",
            "Delicious Pizza.jpg"
        ];

        criticalImages.forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }

    setupPopularCategories() {
        // Add any category-specific functionality here
        const categoryButtons = document.querySelectorAll(".category-btn");
        
        categoryButtons.forEach((btn) => {
            btn.addEventListener("click", () => {
                const category = btn.dataset.category;
                this.filterMenuByCategory(category);
            });
        });
    }

    filterMenuByCategory(category) {
        const menuItems = document.querySelectorAll(".menu-item");
        
        menuItems.forEach((item) => {
            const itemCategory = item.dataset.category;
            
            if (category === "all" || itemCategory === category) {
                item.style.display = "block";
                item.classList.add("visible");
            } else {
                item.style.display = "none";
                item.classList.remove("visible");
            }
        });

        // Update active button
        const categoryButtons = document.querySelectorAll(".category-btn");
        categoryButtons.forEach((btn) => {
            btn.classList.toggle("active", btn.dataset.category === category);
        });
    }

    showNotification(message, type = "info") {
        const notification = document.createElement("div");
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
                <button class="notification-close" aria-label="Close notification">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.classList.add("show");
        }, 10);

        // Auto remove after 5 seconds
        setTimeout(() => {
            this.removeNotification(notification);
        }, 5000);

        // Close button handler
        const closeBtn = notification.querySelector(".notification-close");
        closeBtn.addEventListener("click", () => {
            this.removeNotification(notification);
        });
    }

    getNotificationIcon(type) {
        const icons = {
            success: "check-circle",
            error: "exclamation-circle",
            warning: "exclamation-triangle",
            info: "info-circle",
        };
        return icons[type] || icons.info;
    }

    removeNotification(notification) {
        notification.classList.remove("show");
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // Utility function for throttling
    throttle(func, limit) {
        let inThrottle;
        return function () {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => (inThrottle = false), limit);
            }
        };
    }

    // Utility function for debouncing
    debounce(func, wait, immediate) {
        let timeout;
        return function () {
            const context = this;
            const args = arguments;
            const later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
}

// Initialize the website when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    new RestaurantWebsite();
});

// Handle page visibility changes
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        // Page is hidden, pause any animations or timers
        console.log("Page hidden");
    } else {
        // Page is visible, resume animations or timers
        console.log("Page visible");
    }
});

// Service Worker registration for PWA capabilities
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/sw.js")
            .then((registration) => {
                console.log("SW registered: ", registration);
            })
            .catch((registrationError) => {
                console.log("SW registration failed: ", registrationError);
            });
    });
}

// Store cart in localStorage and redirect to cart page
function addItemToCart(item) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Check if item already exists (by name), increase quantity if so
    let found = cart.find(i => i.name === item.name);
    if (found) {
        found.quantity += 1;
    } else {
        item.quantity = 1;
        cart.push(item);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Helper: get description for menu item (optional, can be improved)
function getMenuItemDescription(name) {
    return "A delicious culinary experience crafted by our master chefs.";
}

// Helper: get rating for menu item (optional, can be improved)
function getMenuItemRating(menuItem) {
    const ratingText = menuItem.querySelector('.rating-text');
    return ratingText ? ratingText.textContent : "(5.0)";
}

// Helper: get stars HTML for rating
function getStarsHTML(menuItem) {
    const starsDiv = menuItem.querySelector('.stars');
    return starsDiv ? starsDiv.innerHTML : "";
}

// Show modal for a menu item
function showQuickViewModal(menuItem) {
    const name = menuItem.querySelector('h4')?.textContent || "";
    const price = menuItem.querySelector('.item-price')?.textContent || "";
    const image = menuItem.querySelector('.item-image img')?.getAttribute('src') || "/placeholder.svg";
    const description = getMenuItemDescription(name);
    const ratingText = getMenuItemRating(menuItem);
    const starsHTML = getStarsHTML(menuItem);

    document.getElementById('modal-item-name').textContent = name;
    document.getElementById('modal-item-price').textContent = price;
    document.getElementById('modal-item-image').src = image;
    document.getElementById('modal-item-description').textContent = description;
    document.getElementById('modal-item-rating').innerHTML = starsHTML;
    document.getElementById('modal-rating-text').textContent = ratingText;

    // Store for add-to-cart/order-now
    document.getElementById('modal-add-to-cart-btn').dataset.itemName = name;
    document.getElementById('modal-add-to-cart-btn').dataset.itemPrice = price;
    document.getElementById('modal-add-to-cart-btn').dataset.itemImage = image;
    document.getElementById('modal-order-now-btn').dataset.itemName = name;
    document.getElementById('modal-order-now-btn').dataset.itemPrice = price;
    document.getElementById('modal-order-now-btn').dataset.itemImage = image;

    document.getElementById('quick-view-modal').style.display = 'block';
}

// Hide modal
function hideQuickViewModal() {
    document.getElementById('quick-view-modal').style.display = 'none';
}

// Add event listeners to all menu items for quick view
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.menu-item').forEach(function(menuItem) {
        menuItem.addEventListener('click', function(e) {
            // Prevent click on buttons inside menu-item from triggering quick view
            if (
                e.target.closest('.add-to-cart-btn') ||
                e.target.closest('.order-now-btn')
            ) return;
            showQuickViewModal(menuItem);
        });
    });

    // Close modal on close button or overlay
    document.getElementById('modal-close').onclick = hideQuickViewModal;
    document.getElementById('modal-overlay').onclick = hideQuickViewModal;

    // Add to cart from modal
    document.getElementById('modal-add-to-cart-btn').onclick = function() {
        const name = this.dataset.itemName;
        const price = this.dataset.itemPrice;
        const image = this.dataset.itemImage;
        addItemToCart({ name, price, image });
        hideQuickViewModal();
        window.location.href = "cart.html";
    };

    // Order now from modal
    document.getElementById('modal-order-now-btn').onclick = function() {
        const name = this.dataset.itemName;
        const price = this.dataset.itemPrice;
        const image = this.dataset.itemImage;
        addItemToCart({ name, price, image });
        hideQuickViewModal();
        window.location.href = "cart.html";
    };

    // Optional: Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === "Escape") hideQuickViewModal();
    });
});


class CartManager {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem("foodiCart") || "[]")
        this.cartBadge = document.getElementById("cart-badge")
        this.init()
    }

    init() {
        this.updateCartBadge()
        this.setupEventListeners()
        this.setupToastNotification()
    }

    setupEventListeners() {
        document.addEventListener("click", (e) => {
            const addBtn = e.target.closest(".add-to-cart-btn")
            if (addBtn) {
                this.handleAddToCart(addBtn)
                return
            }
            const orderBtn = e.target.closest(".order-now-btn")
            if (orderBtn) {
                this.handleOrderNow(orderBtn)
                return
            }
        })
    }

    setupToastNotification() {
        // Create toast element if it doesn't exist
        if (!document.getElementById("cart-toast")) {
            const toast = document.createElement("div")
            toast.id = "cart-toast"
            toast.className = "cart-toast"
            toast.innerHTML = `
                <div class="toast-content">
                    <i class="fas fa-check-circle"></i>
                    <span class="toast-message">Item added to cart!</span>
                </div>
                <div class="toast-progress"></div>
            `
            document.body.appendChild(toast)
        }
    }

    handleAddToCart(button) {
        const itemName = button.dataset.itemName
        const itemPrice = button.dataset.itemPrice
        const itemImage = button.dataset.itemImage
        // Create item object
        const item = {
            id: this.generateId(),
            name: itemName,
            price: itemPrice,
            image: itemImage || "/placeholder.svg?height=100&width=100",
            quantity: 1,
            addedAt: new Date().toISOString(),
        }

        // Check if item already exists in cart (compare name and image)
        const existingItemIndex = this.cart.findIndex(
            (cartItem) => cartItem.name === itemName && cartItem.image === itemImage
        )

        if (existingItemIndex > -1) {
            this.cart[existingItemIndex].quantity += 1
            this.showToast(`${itemName} quantity updated in cart!`, "update")
        } else {
            this.cart.push(item)
            this.showToast(`${itemName} added to cart!`, "success")
        }

        // Save to localStorage
        localStorage.setItem("foodiCart", JSON.stringify(this.cart))

        // Update cart badge
        this.updateCartBadge()

        // Add visual feedback
        this.animateButton(button)
        this.createFlyingAnimation(button, itemImage)
    }

    handleOrderNow(button) {
        // First add to cart
        this.handleAddToCart(button)
        // Then redirect to cart page after a short delay
        setTimeout(() => {
            window.location.href = "cart.html"
        }, 1000)
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2)
    }

    updateCartBadge() {
        if (this.cartBadge) {
            const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0)
            this.cartBadge.textContent = totalItems

            // Add animation when badge updates
            if (totalItems > 0) {
                this.cartBadge.style.display = "flex"
                this.cartBadge.classList.add("animate-pulse")
                setTimeout(() => {
                    this.cartBadge.classList.remove("animate-pulse")
                }, 600)
            } else {
                this.cartBadge.style.display = "none"
            }
        }
    }

    showToast(message, type = "success") {
        const toast = document.getElementById("cart-toast")
        const messageElement = toast.querySelector(".toast-message")
        const iconElement = toast.querySelector("i")

        if (!toast) return

        // Update message and icon based on type
        messageElement.textContent = message

        if (type === "update") {
            iconElement.className = "fas fa-sync-alt"
            toast.style.borderLeftColor = "#f59e0b"
        } else {
            iconElement.className = "fas fa-check-circle"
            toast.style.borderLeftColor = "#4ade80"
        }

        // Show toast
        toast.classList.add("show")

        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove("show")
        }, 3000)
    }

    animateButton(button) {
        const originalText = button.innerHTML

        // Change button appearance
        button.innerHTML = '<i class="fas fa-check"></i> <span>Added!</span>'
        button.style.background = "#22c55e"
        button.style.transform = "scale(0.95)"

        // Reset button after animation
        setTimeout(() => {
            button.innerHTML = originalText
            button.style.background = ""
            button.style.transform = ""
        }, 1500)
    }

    createFlyingAnimation(button, itemImage) {
        const cartIcon = document.querySelector(".cart-icon-link")
        if (!cartIcon) return

        // Create flying element
        const flyingItem = document.createElement("div")
        flyingItem.className = "flying-item"
        flyingItem.innerHTML = `<img src="${itemImage}" alt="Flying item" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;">`

        // Position at button location
        const buttonRect = button.getBoundingClientRect()
        flyingItem.style.left = buttonRect.left + "px"
        flyingItem.style.top = buttonRect.top + "px"
        flyingItem.style.position = "fixed"
        flyingItem.style.zIndex = "10000"
        flyingItem.style.pointerEvents = "none"

        document.body.appendChild(flyingItem)

        // Animate to cart icon
        const cartRect = cartIcon.getBoundingClientRect()
        const deltaX = cartRect.left - buttonRect.left
        const deltaY = cartRect.top - buttonRect.top

        flyingItem.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
        flyingItem.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.3)`
        flyingItem.style.opacity = "0"

        // Remove element after animation
        setTimeout(() => {
            if (flyingItem.parentNode) {
                flyingItem.parentNode.removeChild(flyingItem)
            }
        }, 800)
    }

    // Method to get cart items (for cart page)
    getCartItems() {
        return this.cart
    }

    // Method to remove item from cart
    removeItem(itemId) {
        this.cart = this.cart.filter((item) => item.id !== itemId)
        localStorage.setItem("foodiCart", JSON.stringify(this.cart))
        this.updateCartBadge()
    }

    // Method to update item quantity
    updateQuantity(itemId, newQuantity) {
        const itemIndex = this.cart.findIndex((item) => item.id === itemId)
        if (itemIndex > -1) {
            if (newQuantity <= 0) {
                this.removeItem(itemId)
            } else {
                this.cart[itemIndex].quantity = newQuantity
                localStorage.setItem("foodiCart", JSON.stringify(this.cart))
                this.updateCartBadge()
            }
        }
    }

    // Method to clear entire cart
    clearCart() {
        this.cart = []
        localStorage.setItem("foodiCart", JSON.stringify(this.cart))
        this.updateCartBadge()
    }

    // Method to get cart total
    getCartTotal() {
        return this.cart.reduce((total, item) => {
            const price = Number.parseFloat(item.price.replace("$", ""))
            return total + price * item.quantity
        }, 0)
    }

    // Method to get cart count
    getCartCount() {
        return this.cart.reduce((count, item) => count + item.quantity, 0)
    }
}

// Initialize cart manager when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    window.cartManager = new CartManager()
})

// Add CSS for animations
const style = document.createElement("style")
style.textContent = `
    .animate-pulse {
        animation: pulse 0.6s ease-in-out;
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
    
    .flying-item {
        position: fixed;
        z-index: 10000;
        pointer-events: none;
    }
    .cart-toast {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: #fff;
        color: #222;
        border-radius: 8px;
        box-shadow: 0 4px 24px rgba(0,0,0,0.15);
        padding: 1rem 2rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        border-left: 6px solid #4ade80;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s;
        z-index: 99999;
    }
    .cart-toast.show {
        opacity: 1;
        pointer-events: auto;
    }
    .cart-toast .toast-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    .cart-toast .toast-message {
        font-weight: 500;
    }
    .cart-toast .toast-progress {
        height: 3px;
        width: 100%;
        background: linear-gradient(90deg, #4ade80 0%, #22d3ee 100%);
        margin-top: 0.5rem;
        border-radius: 2px;
        animation: toast-progress 3s linear;
    }
    @keyframes toast-progress {
        from { width: 100%; }
        to { width: 0%; }
    }
`
document.head.appendChild(style)
