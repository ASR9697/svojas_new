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
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: contactForm.method,
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                contactForm.parentNode.innerHTML = `
                    <div class="text-center bg-green-50 p-8 rounded-lg">
                        <h3 class="text-2xl font-bold text-green-700 mb-2">Thank You!</h3>
                        <p class="text-gray-600">Your message has been sent successfully. We will get back to you shortly.</p>
                    </div>
                `;
            } else {
                alert('There was a problem submitting your form. Please try again.');
            }
        });
    }

    // --- Quote Form Wizard Logic ---
    const quoteForm = document.getElementById('quote-form');
    if (quoteForm) {
        // Integrated your personal Formspree endpoint
        quoteForm.action = "https://formspree.io/f/xjkezjlw";
        quoteForm.method = "POST";

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

        function saveCurrentStepData() {
            const inputs = quoteForm.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                if (input.type === 'radio' || input.type === 'checkbox') {
                    if (input.checked) {
                        // For checkboxes, we want to capture their value if checked
                        formState[input.name] = input.value || 'Yes';
                    }
                } else {
                     if (input.name && input.value) {
                        formState[input.name] = input.value;
                    }
                }
            });
        }
        
        // --- HTML TEMPLATES FOR STEPS ---
        function getStep1HTML() {
            return `
                <h3 class="text-xl font-semibold mb-4 text-center">Step 1: What are you looking to ship?</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="radio" name="Shipment Category" value="standard" id="type-standard" class="hidden quote-option-radio">
                    <label for="type-standard" class="block p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-orange-400">
                        <h4 class="font-bold text-lg text-slate-800">Pallets, Crates, or General Freight</h4>
                        <p class="text-sm text-gray-600">For standard LTL and Full Truckload shipments.</p>
                    </label>
                    <input type="radio" name="Shipment Category" value="container" id="type-container" class="hidden quote-option-radio">
                    <label for="type-container" class="block p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-orange-400">
                        <h4 class="font-bold text-lg text-slate-800">A Full Shipping Container</h4>
                        <p class="text-sm text-gray-600">For drayage moves to or from a port/ramp.</p>
                    </label>
                    <input type="radio" name="Shipment Category" value="oog" id="type-oog" class="hidden quote-option-radio">
                    <label for="type-oog" class="block p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-orange-400">
                        <h4 class="font-bold text-lg text-slate-800">Oversized or Heavy Machinery</h4>
                        <p class="text-sm text-gray-600">For Out-of-Gauge (OOG) and specialized loads.</p>
                    </label>
                    <input type="radio" name="Shipment Category" value="air" id="type-air" class="hidden quote-option-radio">
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
                    <input type="radio" name="Direction" value="import" id="type-import" class="hidden quote-option-radio">
                    <label for="type-import" class="w-full text-center block p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-orange-400"><h4 class="font-bold text-lg text-slate-800">Import</h4></label>
                    <input type="radio" name="Direction" value="export" id="type-export" class="hidden quote-option-radio">
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
            let routeHTML, specsHTML, requirementsHTML;

            const locationTypeDropdown = `
                <select class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required>
                    <option>Business with Dock</option>
                    <option>Business without Dock</option>
                    <option>Residence</option>
                    <option>Construction Site</option>
                    <option>Trade Show / Convention</option>
                </select>
            `;
            
            function createAddressBlock(prefix, title) {
                const zipPlaceholder = prefix === 'origin' ? 'e.g., 90210' : 'e.g., 10001';
                return `
                <div>
                    <h4 class="font-semibold text-slate-700 mb-2">${title} Address</h4>
                    <div class="space-y-4 p-4 border rounded-md bg-gray-50">
                        <div><label class="block text-sm font-medium text-gray-700">Company Name*</label><input type="text" name="${prefix}_company" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required></div>
                        <div><label class="block text-sm font-medium text-gray-700">Street Address*</label><input type="text" name="${prefix}_street" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required></div>
                        <div><label class="block text-sm font-medium text-gray-700">ZIP Code*</label><input type="text" name="${prefix}_zip" data-prefix="${prefix}" class="zip-input mt-1 block w-full rounded-md border-gray-300 shadow-sm" required placeholder="${zipPlaceholder}" maxlength="5"></div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><label class="block text-sm font-medium text-gray-700">City*</label><input type="text" name="${prefix}_city" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required></div>
                            <div><label class="block text-sm font-medium text-gray-700">State*</label><input type="text" name="${prefix}_state" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required></div>
                        </div>
                        <div><label class="block text-sm font-medium text-gray-700">Location Type</label>${locationTypeDropdown.replace('<select', `<select name="${prefix}_location_type"`)}</div>
                    </div>
                </div>`;
            }

            if(isSpecial) {
                const portLabelText = formState.category === 'air' ? 'Airport' : 'Port/Ramp';
                const portSelect = getPortSelectHTML(formState.category);
                let addressBlock, portBlock;
                
                if(formState.direction === 'import') {
                    portBlock = `<div><h4 class="font-semibold text-slate-700 mb-2">Port/Airport Details</h4><div class="p-4 border rounded-md bg-gray-50 space-y-4"><div><label class="block text-sm font-medium text-gray-700">${portLabelText} of Pickup*</label>${portSelect}</div></div></div>`;
                    addressBlock = createAddressBlock('delivery', 'Delivery');
                    routeHTML = `<div class="grid grid-cols-1 md:grid-cols-2 gap-6">${portBlock}${addressBlock}</div>`;
                } else { // Export
                    addressBlock = createAddressBlock('pickup', 'Pickup');
                    portBlock = `<div><h4 class="font-semibold text-slate-700 mb-2">Port/Airport Details</h4><div class="p-4 border rounded-md bg-gray-50 space-y-4"><div><label class="block text-sm font-medium text-gray-700">${portLabelText} of Delivery*</label>${portSelect}</div></div></div>`;
                    routeHTML = `<div class="grid grid-cols-1 md:grid-cols-2 gap-6">${addressBlock}${portBlock}</div>`;
                }

                if(formState.category === 'container') {
                    specsHTML = `
                     <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div>
                            <label for="containerSize" class="block text-sm font-medium text-gray-700">Container Size*</label>
                            <select id="containerSize" name="Container Size" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required>
                                <option>20' Container</option><option>40' Container</option><option>45' Container</option><option>53' Container</option>
                            </select>
                        </div>
                        <div>
                            <label for="containerWeight" class="block text-sm font-medium text-gray-700">Gross Weight (lbs)*</label>
                            <input type="number" id="containerWeight" name="Weight (lbs)" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required>
                        </div>
                    </div>`;
                    requirementsHTML = `
                        <div class="flex flex-wrap gap-x-6 gap-y-2">
                            <label class="flex items-center"><input type="checkbox" name="Hazardous" value="Yes" class="rounded border-gray-300 text-orange-600 shadow-sm"> <span class="ml-2">Hazardous Material</span></label>
                            <label class="flex items-center"><input type="checkbox" name="Overweight Permit" value="Yes" class="rounded border-gray-300 text-orange-600 shadow-sm"> <span class="ml-2">Overweight Permit Needed</span></label>
                        </div>`;
                } else { // OOG or Air
                     specsHTML = `
                     <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div><label class="block text-sm font-medium text-gray-700">Commodity*</label><input type="text" name="Commodity" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required></div>
                        <div><label class="block text-sm font-medium text-gray-700">Total Weight (lbs)*</label><input type="number" name="Weight (lbs)" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required></div>
                    </div>`;
                    requirementsHTML = `<div class="flex items-center"><input type="checkbox" name="Hazardous" value="Yes" class="rounded border-gray-300 text-orange-600 shadow-sm"> <span class="ml-2">Hazardous Material</span></div>`;
                }

            } else { // Standard LTL/FTL
                const originBlock = createAddressBlock('origin', 'Origin');
                const destinationBlock = createAddressBlock('destination', 'Destination');
                routeHTML = `<div class="grid grid-cols-1 md:grid-cols-1 gap-6">${originBlock}${destinationBlock}</div>`;
                specsHTML = `
                     <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div><label class="block text-sm font-medium text-gray-700">Commodity*</label><input type="text" name="Commodity" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required></div>
                        <div><label class="block text-sm font-medium text-gray-700">Total Weight (lbs)*</label><input type="number" name="Weight (lbs)" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required></div>
                    </div>
                    <div class="mt-6"><label class="block text-sm font-medium text-gray-700">Number of Pallets/Units & Dimensions</label><textarea name="Pallets and Dims" rows="2" placeholder="e.g., 2 pallets, 48x40x60 each" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea></div>`;
                requirementsHTML = `
                    <div class="flex flex-wrap gap-x-6 gap-y-2">
                        <label class="flex items-center"><input type="checkbox" name="Stackable" value="Yes" class="rounded border-gray-300 text-orange-600 shadow-sm"> <span class="ml-2">Is Freight Stackable?</span></label>
                        <label class="flex items-center"><input type="checkbox" name="Liftgate" value="Yes" class="rounded border-gray-300 text-orange-600 shadow-sm"> <span class="ml-2">Liftgate Needed</span></label>
                        <label class="flex items-center"><input type="checkbox" name="Appointment" value="Yes" class="rounded border-gray-300 text-orange-600 shadow-sm"> <span class="ml-2">Appointment Required</span></label>
                        <label class="flex items-center"><input type="checkbox" name="Hazardous" value="Yes" class="rounded border-gray-300 text-orange-600 shadow-sm"> <span class="ml-2">Hazardous Material</span></label>
                    </div>`;
            }

            return `
                <h3 class="text-xl font-semibold mb-6 text-center">Step ${isSpecial ? '3' : '2'}: Provide Shipment Details</h3>
                <div class="space-y-6">
                    <div>
                        <h4 class="font-semibold text-slate-700 mb-2">Route Details</h4>
                        ${routeHTML}
                        <div class="other-location-container mt-4 hidden">
                            <label class="block text-sm font-medium text-gray-700">Specify Location Name*</label>
                            <input type="text" name="other_port_location" placeholder="Enter full name of port, ramp, or airport" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                        </div>
                    </div>
                    <div>
                        <h4 class="font-semibold text-slate-700 mb-2">Freight Specifications</h4>
                        ${specsHTML}
                    </div>
                     <div>
                        <h4 class="font-semibold text-slate-700 mb-2">Special Requirements</h4>
                        ${requirementsHTML}
                    </div>
                </div>
                <div class="mt-8 flex justify-between items-center">
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
            <select name="Port/Airport Location" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required>
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
                     <div><label class="block text-sm font-medium text-gray-700">Full Name*</label><input type="text" name="Name" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                     <div><label class="block text-sm font-medium text-gray-700">Company Name*</label><input type="text" name="Company" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                     <div><label class="block text-sm font-medium text-gray-700">Email Address*</label><input type="email" name="Email" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                     <div><label class="block text-sm font-medium text-gray-700">Phone Number*</label><input type="tel" name="Phone" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                </div>
                 <div class="mt-6 flex justify-between items-center">
                    <button type="button" class="back-btn text-sm text-gray-600 hover:underline">&larr; Back</button>
                    <button type="submit" class="bg-orange-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-orange-600">Submit Quote Request</button>
                </div>`;
        }
        
        // --- EVENT LISTENERS FOR STEPS ---
        function attachStep1Listeners() {
            quoteForm.querySelectorAll('input[name="Shipment Category"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    formState['Shipment Category'] = e.target.value;
                    formState.category = e.target.value;
                    formState.needsFollowUp = ['container', 'oog', 'air'].includes(formState.category);
                    currentStep = 2;
                    renderStep();
                });
            });
        }
        
        function attachStep2Listeners() {
            if (formState.needsFollowUp) { // Import/Export step
                quoteForm.querySelectorAll('input[name="Direction"]').forEach(radio => {
                    radio.addEventListener('change', (e) => {
                        formState['Direction'] = e.target.value;
                        currentStep = 3;
                        renderStep();
                    });
                });
                 quoteForm.querySelector('.back-btn').addEventListener('click', () => { currentStep = 1; renderStep(); });
            } else { // Standard details step
                attachZipCodeListeners();
                quoteForm.querySelector('.next-btn').addEventListener('click', () => { saveCurrentStepData(); currentStep = 3; renderStep(); });
                quoteForm.querySelector('.back-btn').addEventListener('click', () => { currentStep = 1; renderStep(); });
            }
        }
         
        function attachStep3Listeners() {
             if (formState.needsFollowUp) { // Special details step
                attachZipCodeListeners();
                quoteForm.querySelector('.next-btn').addEventListener('click', () => { saveCurrentStepData(); currentStep = 4; renderStep(); });
                quoteForm.querySelector('.back-btn').addEventListener('click', () => { currentStep = 2; renderStep(); });
                
                const portSelectEl = quoteForm.querySelector('select[name="Port/Airport Location"]');
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
        
        // --- ZIP CODE AUTOPOPULATE ---
        async function fetchCityState(zip, prefix) {
            if (zip.length !== 5) return;
            try {
                const response = await fetch(`https://api.zippopotam.us/us/${zip}`);
                if (!response.ok) throw new Error('Invalid ZIP code');
                const data = await response.json();
                const place = data.places[0];
                
                const cityInput = quoteForm.querySelector(`input[name="${prefix}_city"]`);
                const stateInput = quoteForm.querySelector(`input[name="${prefix}_state"]`);

                if(cityInput) cityInput.value = place['place name'];
                if(stateInput) stateInput.value = place['state'];

            } catch (error) {
                console.error("ZIP code lookup failed:", error);
            }
        }

        function attachZipCodeListeners() {
            quoteForm.querySelectorAll('.zip-input').forEach(input => {
                input.addEventListener('input', (e) => {
                    e.target.value = e.target.value.replace(/\D/g, '');
                    if (e.target.value.length === 5) {
                        fetchCityState(e.target.value, e.target.dataset.prefix);
                    }
                });
            });
        }


        // Init form
        renderStep();
        
        
        // Handle form submission
        quoteForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            saveCurrentStepData(); // Save the final step's data

            const finalFormData = new FormData();
            for (const key in formState) {
                finalFormData.append(key, formState[key]);
            }
            
            // To be safe, also add any fields that might not have been captured if the user went back and forth
            const allInputs = quoteForm.querySelectorAll('input, select, textarea');
            allInputs.forEach(input => {
                if(input.name && !finalFormData.has(input.name)) {
                     if (input.type === 'radio' || input.type === 'checkbox') {
                        if (input.checked) finalFormData.append(input.name, input.value || 'Yes');
                    } else {
                        finalFormData.append(input.name, input.value);
                    }
                }
            });

            try {
                const response = await fetch(quoteForm.action, {
                    method: 'POST',
                    body: finalFormData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    quoteFormContainer.classList.add('hidden');
                    successMessage.classList.remove('hidden');
                    window.scrollTo(0, document.getElementById('quote-form-container').offsetTop);
                } else {
                     throw new Error('Form submission failed');
                }
            } catch (error) {
                 alert('There was a problem submitting your form. Please try again.');
            }
        });

        // Handle "Request Another Quote" button
        resetQuoteFormButton.addEventListener('click', resetForm);
    }
});

