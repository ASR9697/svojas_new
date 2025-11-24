document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. HTML Injection (Header, Footer, Modal) ---
    
    const headerHTML = `
    <header id="header" class="fixed w-full top-0 z-50 transition-all duration-700 ease-in-out border-b border-transparent">
        <nav class="container mx-auto px-6 py-3 flex justify-between items-center">
            <a href="index.html" class="flex items-center">
                <img src="images/logo.png" alt="Svojas Inc. Logo" class="h-14 md:h-20 transition-all duration-500">
            </a>
            <!-- Desktop Menu -->
            <div class="hidden md:flex items-center space-x-8">
                <a href="index.html" class="nav-link text-sm uppercase tracking-wide">Home</a>
                <a href="about.html" class="nav-link text-sm uppercase tracking-wide">About Us</a>
                <a href="services.html" class="nav-link text-sm uppercase tracking-wide">Services</a>
                <a href="industries.html" class="nav-link text-sm uppercase tracking-wide">Industries</a>
                <a href="equipment.html" class="nav-link text-sm uppercase tracking-wide">Equipment</a>
                <a href="faq.html" class="nav-link text-sm uppercase tracking-wide">FAQ</a>
                <a href="contact.html" class="nav-link text-sm uppercase tracking-wide">Contact</a>
            </div>
            <div class="hidden md:flex items-center space-x-6">
                 <a href="tel:+12014900220" class="flex items-center space-x-2 text-sm font-bold phone-link transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.518.759a11.024 11.024 0 005.176 5.176l.76-1.518a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
                    <span>+1 201 490 0220</span>
                </a>
                <a href="quote.html" class="btn-gradient text-white font-bold text-sm px-6 py-3 rounded-full shadow-lg hover:shadow-orange-500/30 transition-all duration-300 transform hover:-translate-y-0.5">Get Quote</a>
            </div>
            <!-- Mobile Menu Button -->
            <button id="mobile-menu-button" class="md:hidden transition-colors duration-300">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
        </nav>
        <!-- Mobile Menu -->
        <div id="mobile-menu" class="hidden md:hidden px-6 pb-6 pt-4 glass-panel absolute w-full left-0 top-full border-t border-gray-100/20 !rounded-t-none">
            <div class="flex flex-col space-y-4">
                <a href="index.html" class="block font-bold text-slate-800 hover:text-orange-500">Home</a>
                <a href="about.html" class="block font-bold text-slate-800 hover:text-orange-500">About Us</a>
                <a href="services.html" class="block font-bold text-slate-800 hover:text-orange-500">Services</a>
                <a href="industries.html" class="block font-bold text-slate-800 hover:text-orange-500">Industries</a>
                <a href="equipment.html" class="block font-bold text-slate-800 hover:text-orange-500">Equipment</a>
                <a href="faq.html" class="block font-bold text-slate-800 hover:text-orange-500">FAQ</a>
                <a href="contact.html" class="block font-bold text-slate-800 hover:text-orange-500">Contact</a>
                <a href="quote.html" class="block btn-gradient text-white text-center font-bold mt-4 px-5 py-3 rounded-xl">Get a Free Quote</a>
            </div>
        </div>
    </header>`;

    const footerHTML = `
    <footer class="bg-slate-900 text-white border-t border-slate-800">
        <div class="container mx-auto px-6 py-16">
            <div class="grid md:grid-cols-4 gap-12">
                <div>
                    <a href="index.html"><img src="images/logo.png" alt="Svojas Inc. Logo" class="h-12 mb-4 brightness-0 invert opacity-90"></a>
                    <p class="italic text-slate-400 text-sm">"CARRYING YOUR LOAD AND TRUST"</p>
                </div>
                 <div>
                    <h4 class="font-bold mb-6 text-orange-500 uppercase tracking-wider text-sm">Company</h4>
                    <ul class="space-y-3 text-sm text-slate-300">
                        <li><a href="about.html" class="hover:text-white transition-colors">About Us</a></li>
                        <li><a href="industries.html" class="hover:text-white transition-colors">Industries</a></li>
                        <li><a href="contact.html" class="hover:text-white transition-colors">Contact</a></li>
                    </ul>
                </div>
                 <div>
                    <h4 class="font-bold mb-6 text-orange-500 uppercase tracking-wider text-sm">Resources</h4>
                    <ul class="space-y-3 text-sm text-slate-300">
                        <li><a href="equipment.html" class="hover:text-white transition-colors">Equipment Guide</a></li>
                        <li><a href="faq.html" class="hover:text-white transition-colors">FAQ</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold mb-6 text-orange-500 uppercase tracking-wider text-sm">Contact Info</h4>
                    <p class="text-slate-300 text-sm">Phone: <a href="tel:+12014900220" class="hover:text-white">+1 201 490 0220</a></p>
                    <p class="text-slate-300 text-sm">Email: <a href="mailto:info@svojasinc.com" class="hover:text-white">info@svojasinc.com</a></p>
                    <p class="text-slate-300 text-sm mt-2">155 New Boston St.<br>Building M, Suite 130,<br>Woburn, MA 01801</p>
                </div>
            </div>
            <div class="mt-16 border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
                &copy; <span id="year"></span> Svojas Inc. All Rights Reserved.
            </div>
        </div>
    </footer>`;

    const modalHTML = `
    <div id="service-modal" class="fixed inset-0 z-50 hidden overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity bg-slate-900/70 backdrop-blur-sm" aria-hidden="true" id="modal-overlay"></div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div class="inline-block overflow-hidden text-left align-bottom transition-all transform glass-panel shadow-2xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full !bg-white/95 !border-white/80">
                <div class="px-6 pt-8 pb-6 sm:p-8">
                    <div class="sm:flex sm:items-start">
                        <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                            <div class="flex justify-between items-center mb-8 border-b border-gray-200/60 pb-6">
                                <h3 class="text-3xl font-bold leading-6 text-slate-800" id="modal-title">Service Title</h3>
                                <button id="modal-close-btn" class="text-gray-400 hover:text-orange-500 transition-colors duration-300 bg-gray-50 hover:bg-orange-50 p-2 rounded-full">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                </button>
                            </div>
                            <div class="mt-2">
                                <p class="text-lg text-slate-600 mb-8 leading-relaxed" id="modal-description">Description.</p>
                                <h4 class="font-bold text-slate-800 mb-4 uppercase text-sm tracking-wide flex items-center">
                                    <span class="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></span> Key Features
                                </h4>
                                <ul class="text-base text-slate-600 space-y-4 bg-gray-50/50 p-6 rounded-xl border border-gray-100" id="modal-details"></ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="px-6 py-6 bg-gray-50/80 sm:px-8 sm:flex sm:flex-row-reverse gap-4 border-t border-gray-200/60">
                    <a href="quote.html" class="btn-gradient inline-flex justify-center w-full px-8 py-3 text-base font-bold text-white rounded-full shadow-md hover:shadow-xl focus:outline-none transition-all duration-500 sm:w-auto">Get a Quote</a>
                    <button type="button" id="modal-bottom-close-btn" class="inline-flex justify-center w-full px-8 py-3 mt-3 text-base font-bold text-slate-600 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 focus:outline-none transition-all duration-500 sm:mt-0 sm:w-auto">Close</button>
                </div>
            </div>
        </div>
    </div>`;

    // Inject Components
    const headerDiv = document.getElementById('dynamic-header');
    if(headerDiv) headerDiv.innerHTML = headerHTML;

    const footerDiv = document.getElementById('dynamic-footer');
    if(footerDiv) footerDiv.innerHTML = footerHTML;

    const modalDiv = document.getElementById('dynamic-modal');
    if(modalDiv) modalDiv.innerHTML = modalHTML;


    // --- 2. Dynamic Logic Initialization (After Injection) ---

    // A. Header Scroll Logic
    const headerElement = document.getElementById('header');
    function handleScroll() {
        if (window.scrollY > 50) {
            headerElement.classList.add('scrolled');
        } else {
            headerElement.classList.remove('scrolled');
        }
    }
    if (headerElement) {
        handleScroll(); 
        window.addEventListener('scroll', handleScroll);
    }

    // B. Mobile Menu
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // C. Highlight Active Link
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPath) {
            link.classList.add('active-page');
            link.classList.add('text-orange-500'); // Explicitly set text color for visibility
        }
    });

    // D. Dynamic Year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- 3. Contact Form Logic ---
    const contactForm = document.getElementById('contact-form');
    if(contactForm) {
        contactForm.action = "https://formspree.io/f/meoldnwk"; // CONTACT FORM LINK
        contactForm.method = "POST";
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const formData = new FormData(contactForm);
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });
                if (response.ok) {
                    const successDiv = document.getElementById('contact-success-message');
                    const formContainer = document.getElementById('contact-form-container');
                    if(successDiv && formContainer) {
                        formContainer.classList.add('hidden');
                        successDiv.classList.remove('hidden');
                    } else {
                        alert("Message sent successfully!");
                        contactForm.reset();
                    }
                } else {
                    const data = await response.json();
                     if (Object.hasOwn(data, 'errors')) {
                        throw new Error(data.errors.map(error => error.message).join(", "));
                    } else {
                        throw new Error('Form submission failed.');
                    }
                }
            } catch (error) {
                console.error("Contact Error:", error);
                alert('Submission Error: ' + error.message + '\n\n(Note: Formspree requires the form to be activated via email first. If testing locally, use a server.)');
            }
        });
    }

    // --- 4. Quote Form Logic ---
    const quoteForm = document.getElementById('quote-form');
    if (quoteForm) {
        // Updated form action
        quoteForm.action = "https://formspree.io/f/xvgnoqlz"; // QUOTE FORM LINK
        quoteForm.method = "POST";
        const quoteFormContainer = document.getElementById('quote-form-container');
        const successMessage = document.getElementById('success-message');
        const resetQuoteFormButton = document.getElementById('reset-quote-form');
        const progressBarContainer = document.getElementById('progress-bar-container');
        const progressBarFill = document.getElementById('progress-bar-fill');
        const progressText = document.getElementById('progress-text');
        
        let currentStep = 1;
        let totalSteps = 3;
        let formState = {};

        function updateProgressBar() {
            if(progressBarFill && progressText) {
                progressText.textContent = `Step ${currentStep} of ${totalSteps}`;
                const percentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
                progressBarFill.style.width = `${percentage}%`;
            }
        }

        function renderStep() {
            quoteForm.innerHTML = '';
            if(progressBarContainer) progressBarContainer.classList.remove('hidden');
            switch(currentStep) {
                case 1:
                    if(progressBarContainer) progressBarContainer.classList.add('hidden');
                    quoteForm.innerHTML = getStep1HTML();
                    attachStep1Listeners();
                    break;
                case 2:
                    totalSteps = formState.needsFollowUp ? 4 : 3;
                    quoteForm.innerHTML = formState.needsFollowUp ? getStep2ImportExportHTML() : getStep2DetailsHTML();
                    attachStep2Listeners();
                    break;
                case 3:
                    quoteForm.innerHTML = formState.needsFollowUp ? getStep3DetailsHTML() : getStep3ContactHTML();
                    attachStep3Listeners();
                    break;
                case 4:
                    quoteForm.innerHTML = getStep4ContactHTML();
                    attachStep4Listeners();
                    break;
            }
            updateProgressBar();
        }

        function resetForm() {
            currentStep = 1;
            formState = {};
            quoteForm.reset();
            renderStep();
            quoteFormContainer.classList.remove('hidden');
            successMessage.classList.add('hidden');
        }

        function saveCurrentStepData() {
            const inputs = quoteForm.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                if (input.type === 'radio' || input.type === 'checkbox') {
                    if (input.checked) formState[input.name] = input.value || 'Yes';
                } else if (input.name && input.value) {
                    if (input.name.toLowerCase() === 'email') {
                         formState['email'] = input.value;
                    } else {
                         formState[input.name] = input.value;
                    }
                }
            });
        }
        
        function getStep1HTML() {
            return `
                <h3 class="text-xl font-bold mb-6 text-center text-slate-800">What are you shipping?</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="radio" name="Shipment Category" value="standard" id="type-standard" class="hidden quote-option-radio">
                    <label for="type-standard" class="block p-6 rounded-xl cursor-pointer"><h4 class="font-bold text-lg">General Freight (LTL/FTL)</h4><p class="text-sm text-slate-500">Pallets, crates, or boxes.</p></label>
                    <input type="radio" name="Shipment Category" value="container" id="type-container" class="hidden quote-option-radio">
                    <label for="type-container" class="block p-6 rounded-xl cursor-pointer"><h4 class="font-bold text-lg">Intermodal Container</h4><p class="text-sm text-slate-500">Drayage from port or rail.</p></label>
                    <input type="radio" name="Shipment Category" value="oog" id="type-oog" class="hidden quote-option-radio">
                    <label for="type-oog" class="block p-6 rounded-xl cursor-pointer"><h4 class="font-bold text-lg">Oversized / Heavy</h4><p class="text-sm text-slate-500">Machinery, RGN, Flatbed.</p></label>
                    <input type="radio" name="Shipment Category" value="air" id="type-air" class="hidden quote-option-radio">
                    <label for="type-air" class="block p-6 rounded-xl cursor-pointer"><h4 class="font-bold text-lg">Airport Recovery/Delivery</h4><p class="text-sm text-slate-500">Import/Export ground support.</p></label>
                </div>`;
        }
        function getStep2ImportExportHTML() {
             return `<h3 class="text-xl font-bold mb-6 text-center text-slate-800">Import or Export?</h3><div class="flex justify-center gap-6"><input type="radio" name="Direction" value="import" id="type-import" class="hidden quote-option-radio"><label for="type-import" class="w-full text-center block p-6 rounded-xl cursor-pointer"><h4 class="font-bold text-lg">Import</h4></label><input type="radio" name="Direction" value="export" id="type-export" class="hidden quote-option-radio"><label for="type-export" class="w-full text-center block p-6 rounded-xl cursor-pointer"><h4 class="font-bold text-lg">Export</h4></label></div><div class="mt-8 text-center"><button type="button" class="back-btn text-sm text-slate-500 hover:text-orange-500 hover:underline">Back</button></div>`;
        }
        function getStep2DetailsHTML() { return getDetailsHTML(false); }
        function getStep3DetailsHTML() { return getDetailsHTML(true); }
        function getDetailsHTML(isSpecial) {
            return `<h3 class="text-xl font-bold mb-6 text-center text-slate-800">Shipment Details</h3><div class="space-y-5"><div class="grid grid-cols-1 md:grid-cols-2 gap-5"><div><label class="block text-sm font-bold text-slate-700 mb-1">Origin Zip</label><input type="text" name="Origin Zip" class="zip-input w-full rounded-lg p-3" placeholder="12345" required></div><div><label class="block text-sm font-bold text-slate-700 mb-1">Destination Zip</label><input type="text" name="Dest Zip" class="zip-input w-full rounded-lg p-3" placeholder="90210" required></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-5"><div><label class="block text-sm font-bold text-slate-700 mb-1">Commodity</label><input type="text" name="Commodity" class="w-full rounded-lg p-3" required></div><div><label class="block text-sm font-bold text-slate-700 mb-1">Total Weight (lbs)</label><input type="number" name="Weight" class="w-full rounded-lg p-3" required></div></div></div><div class="mt-8 flex justify-between items-center"><button type="button" class="back-btn text-sm text-slate-500 hover:text-orange-500 hover:underline">Back</button><button type="button" class="next-btn btn-gradient text-white font-bold px-8 py-3 rounded-full shadow-lg">Continue</button></div>`;
        }
        function getStep3ContactHTML() { return getContactHTML(false); }
        function getStep4ContactHTML() { return getContactHTML(true); }
        function getContactHTML(isSpecial) {
             return `<h3 class="text-xl font-bold mb-6 text-center text-slate-800">Contact Information</h3><div class="grid grid-cols-1 gap-5"><div><label class="block text-sm font-bold text-slate-700 mb-1">Full Name</label><input type="text" name="Name" class="w-full rounded-lg p-3" required></div><div><label class="block text-sm font-bold text-slate-700 mb-1">Company</label><input type="text" name="Company" class="w-full rounded-lg p-3" required></div><div><label class="block text-sm font-bold text-slate-700 mb-1">Email</label><input type="email" name="email" class="w-full rounded-lg p-3" required></div><div><label class="block text-sm font-bold text-slate-700 mb-1">Phone</label><input type="tel" name="Phone" class="w-full rounded-lg p-3" required></div></div><div class="mt-8 flex justify-between items-center"><button type="button" class="back-btn text-sm text-slate-500 hover:text-orange-500 hover:underline">Back</button><button type="submit" class="btn-gradient text-white font-bold px-8 py-3 rounded-full shadow-lg">Get Quote</button></div>`;
        }
        
        function attachStep1Listeners() {
            quoteForm.querySelectorAll('input[name="Shipment Category"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    formState['Shipment Category'] = e.target.value;
                    formState.category = e.target.value;
                    formState.needsFollowUp = ['container', 'oog', 'air'].includes(e.target.value);
                    currentStep = 2; renderStep();
                });
            });
        }
        function attachStep2Listeners() {
            if (formState.needsFollowUp) { 
                quoteForm.querySelectorAll('input[name="Direction"]').forEach(radio => {
                    radio.addEventListener('change', (e) => { formState['Direction'] = e.target.value; currentStep = 3; renderStep(); });
                });
                 quoteForm.querySelector('.back-btn').addEventListener('click', () => { currentStep = 1; renderStep(); });
            } else { 
                quoteForm.querySelector('.next-btn').addEventListener('click', () => { saveCurrentStepData(); currentStep = 3; renderStep(); });
                quoteForm.querySelector('.back-btn').addEventListener('click', () => { currentStep = 1; renderStep(); });
            }
        }
        function attachStep3Listeners() {
             if (formState.needsFollowUp) { 
                quoteForm.querySelector('.next-btn').addEventListener('click', () => { saveCurrentStepData(); currentStep = 4; renderStep(); });
                quoteForm.querySelector('.back-btn').addEventListener('click', () => { currentStep = 2; renderStep(); });
             } else { 
                 quoteForm.querySelector('.back-btn').addEventListener('click', () => { currentStep = 2; renderStep(); });
             }
        }
        function attachStep4Listeners() {
            quoteForm.querySelector('.back-btn').addEventListener('click', () => { currentStep = 3; renderStep(); });
        }

        renderStep(); // Init form
        
        quoteForm.addEventListener('submit', async function(e) {
            e.preventDefault(); saveCurrentStepData();
            const finalFormData = new FormData();
            
            for (const key in formState) {
                finalFormData.append(key, formState[key]);
            }
            if (formState['email']) {
                finalFormData.append('_replyto', formState['email']);
            }

            const allInputs = quoteForm.querySelectorAll('input, select, textarea');
            allInputs.forEach(input => { 
                if(input.name && input.value && !formState.hasOwnProperty(input.name)) {
                     finalFormData.append(input.name, input.value);
                     if (input.name === 'email') finalFormData.append('_replyto', input.value);
                }
            });

            try {
                const response = await fetch(quoteForm.action, { method: 'POST', body: finalFormData, headers: { 'Accept': 'application/json' } });
                
                if (response.ok) { 
                    quoteFormContainer.classList.add('hidden'); 
                    successMessage.classList.remove('hidden'); 
                } else {
                    const data = await response.json();
                    if (Object.hasOwn(data, 'errors')) {
                        throw new Error(data.errors.map(error => error.message).join(", "));
                    } else {
                        throw new Error('Form submission failed. Please check your connection and try again.');
                    }
                }
            } catch (error) { 
                console.error("Form Error:", error);
                alert('Submission Error: ' + error.message + '\n\n(Note: Formspree requires the form to be activated via email first. If testing locally, use a server.)'); 
            }
        });
        resetQuoteFormButton.addEventListener('click', resetForm);
    }

    // --- 4. Service Modal Logic ---
    const servicesData = {
        'ftl': { title: 'FTL & LTL Freight', description: 'Our core competency. Whether you need a dedicated truck for a large shipment or just a few pallet spaces, we optimize routes to save you money and time.', details: ['Full Truckload (FTL): Exclusive use of a 53\' Dry Van.', 'Less-than-Truckload (LTL): Cost-effective consolidation.', 'Nationwide Network: Access to thousands of vetted carriers.', 'Real-Time Tracking: Know exactly where your freight is.'] },
        'drayage': { title: 'Drayage Services', description: 'The critical first and last mile. We specialize in moving containers in and out of major US ports and rail ramps efficiently.', details: ['Port & Rail: Service at all major hubs (LA/LB, NY/NJ).', 'TWIC Certified Drivers: Fully compliant for secure access.', 'Container Types: Handling 20\', 40\', 45\' and reefer containers.', 'Appointment Management: We handle terminal coordination.'] },
        'air': { 
            title: 'Airport Recovery & Delivery', 
            description: 'We specialize in the ground handling of air cargo. We are not an air carrier, but we provide the critical truck recovery and delivery services needed for import and export air shipments.', 
            details: [
                'Import Recovery: Prompt retrieval of freight from airline terminals.', 
                'Export Delivery: On-time delivery to airports for scheduled flights.', 
                'TSA Compliant: Drivers trained and cleared for airport access.', 
                'Dedicated Ground Support: We bridge the gap between the runway and the warehouse.'
            ] 
        },
        'oog': { title: 'Specialized & OOG Cargo', description: 'Heavy, wide, or tall? No problem. We provide specialized equipment and expert planning for cargo that doesn\'t fit in a standard box.', details: ['Equipment: Flatbeds, Step Decks, RGNs.', 'Permitting: We handle all state/municipal permits.', 'Escort Services: Pilot cars and police escorts.', 'Project Logistics: End-to-end planning for industrial moves.'] }
    };

    window.openServiceModal = function(serviceId) {
        const modal = document.getElementById('service-modal');
        const titleEl = document.getElementById('modal-title');
        const descEl = document.getElementById('modal-description');
        const detailsEl = document.getElementById('modal-details');
        const data = servicesData[serviceId];

        if (data && modal) {
            titleEl.textContent = data.title;
            descEl.textContent = data.description;
            detailsEl.innerHTML = data.details.map(item => `<li class="flex items-start"><svg class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg><span>${item}</span></li>`).join('');
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeServiceModal = function() {
        const modal = document.getElementById('service-modal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    };

    // Attach triggers using event delegation
    document.addEventListener('click', function(e) {
        const trigger = e.target.closest('.service-card-trigger');
        if (trigger) {
            const serviceId = trigger.getAttribute('data-service');
            window.openServiceModal(serviceId);
        }
        if (e.target.closest('#modal-close-btn') || e.target.closest('#modal-bottom-close-btn') || e.target.id === 'modal-overlay') {
            window.closeServiceModal();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') window.closeServiceModal();
    });
});