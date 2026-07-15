// ==========================================================================
// Tour Booking Form Validation & Calendar Integrations
// ==========================================================================
export function initTourBookingForm() {
  const form = document.getElementById('tour-form');
  const dateInput = document.getElementById('tour-date');
  const successModal = document.getElementById('tour-success-modal');
  const closeModalBtn = document.getElementById('close-tour-modal');
  const addCalendarBtn = document.getElementById('btn-add-tour-calendar');
  const downloadBrochureBtn = document.getElementById('btn-download-brochure');

  if (!form) return;

  // Set min date to today dynamically
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const minDateStr = `${yyyy}-${mm}-${dd}`;
  
  if (dateInput) {
    dateInput.setAttribute('min', minDateStr);
  }

  let lastTourDetails = null;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/;

  const validateField = (input, isValid) => {
    const group = input.closest('.form-group');
    if (!group) return;

    if (isValid) {
      group.classList.remove('invalid');
    } else {
      group.classList.add('invalid');
    }
    return isValid;
  };

  const checkValidity = () => {
    let isValid = true;

    // Validate Name
    const nameInput = document.getElementById('tour-name');
    if (nameInput) {
      const isVal = nameInput.value.trim().length >= 2;
      if (!validateField(nameInput, isVal)) isValid = false;
    }

    // Validate Email
    const emailInput = document.getElementById('tour-email');
    if (emailInput) {
      const isVal = emailRegex.test(emailInput.value.trim());
      if (!validateField(emailInput, isVal)) isValid = false;
    }

    // Validate Phone
    const phoneInput = document.getElementById('tour-phone');
    if (phoneInput) {
      const isVal = phoneRegex.test(phoneInput.value.trim());
      if (!validateField(phoneInput, isVal)) isValid = false;
    }

    // Validate Suite Choice
    const suiteSelect = document.getElementById('tour-suite');
    if (suiteSelect) {
      const isVal = suiteSelect.value !== '';
      if (!validateField(suiteSelect, isVal)) isValid = false;
    }

    // Validate Date
    if (dateInput) {
      const isVal = dateInput.value !== '';
      if (!validateField(dateInput, isVal)) isValid = false;
    }

    // Validate Time
    const timeSelect = document.getElementById('tour-time');
    if (timeSelect) {
      const isVal = timeSelect.value !== '';
      if (!validateField(timeSelect, isVal)) isValid = false;
    }

    return isValid;
  };

  // Clear validation errors on typing
  form.querySelectorAll('input, select').forEach(element => {
    element.addEventListener('input', () => {
      const group = element.closest('.form-group');
      if (group) group.classList.remove('invalid');
    });
  });

  // Submit form callback
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (checkValidity()) {
      const name = document.getElementById('tour-name').value.trim();
      const suiteSelect = document.getElementById('tour-suite');
      const suiteText = suiteSelect.options[suiteSelect.selectedIndex].text;
      const suiteValue = suiteSelect.value;
      const dateVal = dateInput.value;
      const timeSelect = document.getElementById('tour-time');
      const timeText = timeSelect.options[timeSelect.selectedIndex].text;
      const timeValue = timeSelect.value;
      const phone = document.getElementById('tour-phone').value.trim();

      // Cache details for .ics trigger
      lastTourDetails = {
        name,
        suite: suiteText,
        date: dateVal,
        timeSlot: timeValue,
        phone
      };

      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = new Date(dateVal).toLocaleDateString('en-US', options);

      // Populate Success Modal Fields
      document.getElementById('modal-guest-name').textContent = name;
      document.getElementById('modal-suite-name').textContent = suiteText;
      document.getElementById('modal-schedule-time').textContent = `${formattedDate} at ${timeText}`;

      // Show Modal
      if (successModal) {
        successModal.classList.add('active');
      }

      form.reset();
    }
  });

  // Calendar Event (.ics) Downloader
  addCalendarBtn?.addEventListener('click', () => {
    if (!lastTourDetails) return;

    const { name, suite, date, timeSlot, phone } = lastTourDetails;

    let start = '1000';
    let end = '1100';

    if (timeSlot === 'afternoon') {
      start = '1330';
      end = '1430';
    } else if (timeSlot === 'evening') {
      start = '1700';
      end = '1800';
    }

    const cleanDate = date.replace(/-/g, '');
    const uid = Math.random().toString(36).substring(2) + "@auraheights.com";
    const stamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Aura Heights//Private Tour Reservation//EN',
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${cleanDate}T${start}00`,
      `DTEND:${cleanDate}T${end}00`,
      `SUMMARY:Obsidian Suite Tour - ${suite}`,
      'LOCATION:808 Obsidian Avenue\\, Suite 45\\, Metropolis',
      `DESCRIPTION:Private showing for ${name} (${phone}). Private loop security clearance active. Valet comped.`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `aura_heights_tour_${cleanDate}.ics`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  // Heights VIP Catalog & Brochure Downloader
  downloadBrochureBtn?.addEventListener('click', () => {
    const brochureContent = [
      "=========================================================================",
      "                     AURA HEIGHTS PRIVATE RESIDENCES                     ",
      "=========================================================================",
      "Thank you for requesting exclusive documentation for Aura Heights.",
      "",
      "BUILDING DETAILS:",
      "  • Main Entrance: 808 Obsidian Avenue, Metropolis",
      "  • Concierge Service: 24/7 Smart Biometrics Vault",
      "  • VIP Sky Club: Obsidian Lounge, Floor 45",
      "",
      "RESIDENCE METRICS:",
      "  1. Grand Studio Executive",
      "     - Total area: 1,250 sq.ft.",
      "     - Balcony: 200 sq.ft. private sunset terrace",
      "     - Floor features: Heated Italian slate floors",
      "",
      "  2. Imperial Duplex Suite",
      "     - Total area: 2,800 sq.ft. (double height mezzanine ceiling)",
      "     - Layout: 3 Bedrooms, 3.5 Baths, Private Study",
      "     - Structural specs: Solid sound-decoupling facade quartz",
      "",
      "  3. Royal Sky Penthouse",
      "     - Total area: 5,200 sq.ft. (full floor wrap)",
      "     - Access: Private express elevator card portal",
      "     - Features: Master heated infinity plunge pool",
      "",
      "VALET & SECURITY DETAILS:",
      "  • Private loop road access coordinates will be sent 1 hour before arrival.",
      "  • Underground valet parking is fully comped for owners and registered guests.",
      "",
      "We look forward to hosting you for your private architectural showing.",
      "The Aura Heights Concierge Registry & Host Sommelier Team"
    ].join('\r\n');

    const blob = new Blob([brochureContent], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `aura_heights_vip_brochure.txt`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  // Modal Closing
  if (closeModalBtn && successModal) {
    const closeModal = () => successModal.classList.remove('active');
    closeModalBtn.addEventListener('click', closeModal);
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) closeModal();
    });
  }
}
