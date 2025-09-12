document.addEventListener('DOMContentLoaded', function() {
    // --- Mobile Menu Logic ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Dynamic Year in Footer ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // --- Contact Form Submission ---
    const contactForm = document.getElementById('contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you shortly.');
            contactForm.reset();
        });
    }

    // --- Quote Form Wizard Logic ---
    const quoteForm = document.getElementById('quote-form');
    if (quoteForm) {
        const quoteFormContainer = document.getElementById('quote-form-container');
        const successMessage = document.getElementById('success-message');
        const resetQuoteFormButton = document.getElementById('reset-quote-form');
        const quoteIntroText = document.getElementById('quote-intro-text');
        const progressBarContainer = document.getElementById('progress-bar-container');
        const progressBarFill = document.getElementById('progress-bar-fill');
        const progressText = document.getElementById('progress-text');
        
        let currentStep = 1;
        let totalSteps = 3;
        let formState = {};

        function updateProgressBar() {
            progressText.textContent = `Step ${currentStep} of ${totalSteps}`;
            const percentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
            progressBarFill.style.width = `${percentage}%`;
        }

        function renderStep() {
            quoteForm.innerHTML = '';
            progressBarContainer.classList.remove('hidden');
            quoteIntroText.classList.add('hidden');
            
            switch(currentStep) {
                case 1:
                    progressBarContainer.classList.add('hidden');
                    quoteIntroText.classList.remove('hidden');
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
        
        // --- HTML TEMPLATES FOR STEPS ---
        function getStep1HTML() {
            return `
                <h3 class="text-xl font-semibold mb-4 text-center">Step 1: What are you looking to ship?</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="radio" name="shipmentCategory" value="standard" id="type-standard" class="hidden quote-option-radio">
                    <label for="type-standard" class="block p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-orange-400">
                        <h4 class="font-bold text-lg text-slate-800">Pallets, Crates, or General Freight</h4>
                        <p class="text-sm text-gray-600">For standard LTL and Full Truckload shipments.</p>
                    </label>
                    <input type="radio" name="shipmentCategory" value="container" id="type-container" class="hidden quote-option-radio">
                    <label for="type-container" class="block p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-orange-400">
                        <h4 class="font-bold text-lg text-slate-800">A Full Shipping Container</h4>
                        <p class="text-sm text-gray-600">For drayage moves to or from a port/ramp.</p>
                    </label>
                    <input type="radio" name="shipmentCategory" value="oog" id="type-oog" class="hidden quote-option-radio">
                    <label for="type-oog" class="block p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-orange-400">
                        <h4 class="font-bold text-lg text-slate-800">Oversized or Heavy Machinery</h4>
                        <p class="text-sm text-gray-600">For Out-of-Gauge (OOG) and specialized loads.</p>
                    </label>
                    <input type="radio" name="shipmentCategory" value="air" id="type-air" class="hidden quote-option-radio">
                    <label for="type-air" class="block p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-orange-400">
                        <h4 class="font-bold text-lg text-slate-800">Time-Sensitive Air Cargo</h4>
                        <p class="text-sm text-gray-600">For ground transport to or from an airport.</p>
                    </label>
                </div>`;
        }

        function getStep2ImportExportHTML() {
             return `
                <h3 class="text-xl font-semibold mb-4 text-center">Step 2: Is this an Import or Export?</h3>
                <div class="flex justify-center gap-4">
                    <input type="radio" name="importExport" value="import" id="type-import" class="hidden quote-option-radio">
                    <label for="type-import" class="w-full text-center block p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-orange-400"><h4 class="font-bold text-lg text-slate-800">Import</h4></label>
                    <input type="radio" name="importExport" value="export" id="type-export" class="hidden quote-option-radio">
                    <label for="type-export" class="w-full text-center block p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-orange-400"><h4 class="font-bold text-lg text-slate-800">Export</h4></label>
                </div>
                <div class="mt-6 text-center"><button type="button" class="back-btn text-sm text-gray-600 hover:underline">&larr; Back to Shipment Type</button></div>`;
        }

        function getStep2DetailsHTML() { /* For standard shipments */
            return getDetailsHTML(false);
        }
        function getStep3DetailsHTML() { /* For special shipments */
            return getDetailsHTML(true);
        }
        
        function getDetailsHTML(isSpecial) {
            let originHTML, destinationHTML, specsHTML;

            if(isSpecial) {
                const portLabelText = formState.category === 'air' ? 'Airport' : 'Port/Ramp';
                const portSelect = getPortSelectHTML(formState.category);
                
                if(formState.direction === 'import') {
                    originHTML = `<div><label class="block text-sm font-medium text-gray-700">${portLabelText} of Pickup*</label>${portSelect}</div>`;
                    destinationHTML = `<div><label class="block text-sm font-medium text-gray-700">Final Delivery ZIP Code*</label><input type="text" name="destination" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required placeholder="e.g. 89109"></div>`;
                } else { // Export
                    originHTML = `<div><label class="block text-sm font-medium text-gray-700">Pickup ZIP Code*</label><input type="text" name="origin" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required placeholder="e.g. 60605"></div>`;
                    destinationHTML = `<div><label class="block text-sm font-medium text-gray-700">${portLabelText} of Delivery*</label>${portSelect}</div>`;
                }

                if(formState.category === 'container') {
                    specsHTML = `
                     <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div>
                            <label for="containerSize" class="block text-sm font-medium text-gray-700">Container Size*</label>
                            <select id="containerSize" name="containerSize" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required>
                                <option>20' Container</option><option>40' Container</option><option>45' Container</option><option>53' Container</option>
                            </select>
                        </div>
                        <div>
                            <label for="containerWeight" class="block text-sm font-medium text-gray-700">Gross Weight (lbs)*</label>
                            <input type="number" id="containerWeight" name="weight" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required>
                        </div>
                    </div>`;
                } else { // OOG or Air
                     specsHTML = `
                     <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div><label class="block text-sm font-medium text-gray-700">Commodity*</label><input type="text" name="commodity" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required></div>
                        <div><label class="block text-sm font-medium text-gray-700">Total Weight (lbs)*</label><input type="number" name="weight" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required></div>
                    </div>`;
                }

            } else { // Standard LTL/FTL
                originHTML = `<div><label class="block text-sm font-medium text-gray-700">Origin ZIP Code*</label><input type="text" name="origin" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required placeholder="e.g. 90210"></div>`;
                destinationHTML = `<div><label class="block text-sm font-medium text-gray-700">Destination ZIP Code*</label><input type="text" name="destination" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required placeholder="e.g. 10001"></div>`;
                specsHTML = `
                     <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div><label class="block text-sm font-medium text-gray-700">Commodity*</label><input type="text" name="commodity" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required></div>
                        <div><label class="block text-sm font-medium text-gray-700">Total Weight (lbs)*</label><input type="number" name="weight" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required></div>
                    </div>
                    <div class="mt-6"><label class="block text-sm font-medium text-gray-700">Number of Pallets/Units & Dimensions</label><textarea name="dims" rows="2" placeholder="e.g., 2 pallets, 48x40x60 each" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea></div>`;
            }

            return `
                <h3 class="text-xl font-semibold mb-6 text-center">Step ${isSpecial ? '3' : '2'}: Provide Shipment Details</h3>
                <div class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">${originHTML}${destinationHTML}</div>
                    <div class="other-location-container mt-2 hidden">
                        <label class="block text-sm font-medium text-gray-700">Specify Location Name*</label>
                        <input type="text" name="other_port_location" placeholder="Enter location name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                    </div>
                    <div>${specsHTML}</div>
                </div>
                <div class="mt-6 flex justify-between items-center">
                    <button type="button" class="back-btn text-sm text-gray-600 hover:underline">&larr; Back</button>
                    <button type="button" class="next-btn bg-orange-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-orange-600">Continue</button>
                </div>`;
        }

        function getPortSelectHTML(category) {
            const isAir = category === 'air';
            const portAndRampOptions = `
                <optgroup label="West Coast Ports">
                    <option value="LALB">Los Angeles/Long Beach, CA</option>
                    <option value="OAK">Oakland, CA</option>
                    <option value="SEA">Seattle, WA</option>
                    <option value="TAC">Tacoma, WA</option>
                    <option value="PDX">Portland, OR</option>
                </optgroup>
                <optgroup label="East Coast Ports">
                    <option value="NYNJ">New York/New Jersey</option>
                    <option value="SAV">Savannah, GA</option>
                    <option value="ORF">Norfolk, VA</option>
                    <option value="CHS">Charleston, SC</option>
                    <option value="BAL">Baltimore, MD</option>
                    <option value="JAX">Jacksonville, FL</option>
                    <option value="MIA">Miami, FL</option>
                </optgroup>
                <optgroup label="Gulf Coast Ports">
                    <option value="HOU">Houston, TX</option>
                    <option value="MSY">New Orleans, LA</option>
                    <option value="MOB">Mobile, AL</option>
                </optgroup>
                <optgroup label="Major Inland Ramps">
                    <option value="CHI">Chicago, IL</option>
                    <option value="ATL">Atlanta, GA</option>
                    <option value="DFW">Dallas/Fort Worth, TX</option>
                    <option value="MKC">Kansas City, MO</option>
                    <option value="MEM">Memphis, TN</option>
                    <option value="CMH">Columbus, OH</option>
                </optgroup>
            `;
            const airportOptions = `
                <optgroup label="Major Airports">
                    <option value="JFK">JFK - New York, NY</option>
                    <option value="LAX">LAX - Los Angeles, CA</option>
                    <option value="ORD">ORD - Chicago, IL</option>
                    <option value="DFW_AIR">DFW - Dallas/Fort Worth, TX</option>
                    <option value="ATL_AIR">ATL - Atlanta, GA</option>
                    <option value="MIA_AIR">MIA - Miami, FL</option>
                </optgroup>
            `;

            return `
            <select name="portLocation" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required>
                <option value="" disabled selected>Select a location...</option>
                ${isAir ? airportOptions : portAndRampOptions}
                <option value="other">Other (Please specify)</option>
            </select>`;
        }
        
        function getStep3ContactHTML() { /* For standard shipments */
             return getContactHTML(false);
        }
        function getStep4ContactHTML() { /* For special shipments */
             return getContactHTML(true);
        }
        
        function getContactHTML(isSpecial) {
            const stepTitle = isSpecial ? "Step 4: Your Contact Information" : "Step 3: Your Contact Information";
             return `
                <h3 class="text-xl font-semibold mb-6 text-center">${stepTitle}</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div><label class="block text-sm font-medium text-gray-700">Full Name*</label><input type="text" name="fullName" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                     <div><label class="block text-sm font-medium text-gray-700">Company Name*</label><input type="text" name="companyName" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                     <div><label class="block text-sm font-medium text-gray-700">Email Address*</label><input type="email" name="email" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                     <div><label class="block text-sm font-medium text-gray-700">Phone Number*</label><input type="tel" name="phone" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                </div>
                 <div class="mt-6 flex justify-between items-center">
                    <button type="button" class="back-btn text-sm text-gray-600 hover:underline">&larr; Back</button>
                    <button type="submit" class="bg-orange-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-orange-600">Submit Quote Request</button>
                </div>`;
        }
        
        // --- EVENT LISTENERS FOR STEPS ---
        function attachStep1Listeners() {
            quoteForm.querySelectorAll('input[name="shipmentCategory"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    formState.category = e.target.value;
                    formState.needsFollowUp = ['container', 'oog', 'air'].includes(formState.category);
                    currentStep = 2;
                    renderStep();
                });
            });
        }
        
        function attachStep2Listeners() {
            if (formState.needsFollowUp) { // Import/Export step
                quoteForm.querySelectorAll('input[name="importExport"]').forEach(radio => {
                    radio.addEventListener('change', (e) => {
                        formState.direction = e.target.value;
                        currentStep = 3;
                        renderStep();
                    });
                });
                 quoteForm.querySelector('.back-btn').addEventListener('click', () => { currentStep = 1; renderStep(); });
            } else { // Standard details step
                quoteForm.querySelector('.next-btn').addEventListener('click', () => { currentStep = 3; renderStep(); });
                quoteForm.querySelector('.back-btn').addEventListener('click', () => { currentStep = 1; renderStep(); });
            }
        }
         
        function attachStep3Listeners() {
             if (formState.needsFollowUp) { // Special details step
                quoteForm.querySelector('.next-btn').addEventListener('click', () => { currentStep = 4; renderStep(); });
                quoteForm.querySelector('.back-btn').addEventListener('click', () => { currentStep = 2; renderStep(); });
                
                const portSelectEl = quoteForm.querySelector('select[name="portLocation"]');
                if(portSelectEl) {
                    portSelectEl.addEventListener('change', (e) => {
                        const otherContainer = quoteForm.querySelector('.other-location-container');
                        const otherInput = otherContainer.querySelector('input');
                        if(e.target.value === 'other') {
                            otherContainer.classList.remove('hidden');
                            otherInput.required = true;
                        } else {
                            otherContainer.classList.add('hidden');
                            otherInput.required = false;
                            otherInput.value = '';
                        }
                    });
                }

             } else { // Standard contact step
                 quoteForm.querySelector('.back-btn').addEventListener('click', () => { currentStep = 2; renderStep(); });
             }
        }

        function attachStep4Listeners() { // Special contact step
            quoteForm.querySelector('.back-btn').addEventListener('click', () => { currentStep = 3; renderStep(); });
        }

        // Init form
        renderStep();
        
        // Handle form submission
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            quoteFormContainer.classList.add('hidden');
            successMessage.classList.remove('hidden');
            window.scrollTo(0, document.getElementById('quote-form-container').offsetTop);
        });

        // Handle "Request Another Quote" button
        resetQuoteFormButton.addEventListener('click', resetForm);
    }
});

