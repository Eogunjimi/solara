// Service landing-page content, one entry per published service (keys match services.js ids).
//
// Content rules for this file:
// - No fixed prices, guarantees, certifications, warranties, or customer results are stated.
//   Pricing is always "after assessment, with a written quote".
// - `portfolio` is empty until genuine completed-project photos and details are supplied.
//   Do not add stock photos here as evidence of work.
// - `seo.keyword` is a reasoned search-intent target, not keyword-tool volume data.
// - Shared site content (trust badges, reviews, Google rating, footer) comes from the homepage.
export const serviceDetails = {
  0: {
    seo: {
      title: 'Residential Solar Installation in Lagos | AFEEZTECHSOLAR',
      description:
        'Home solar and battery systems in Lagos, sized around your appliances and backup needs. Request a free assessment and quote from AFEEZTECHSOLAR.',
      keyword: 'residential solar installation Lagos',
    },
    tagline: 'Power for the way you live.',
    ctaTitle: 'Ready for home solar that powers your everyday life?',
    ctaCopy:
      'Tell us about your home and the outages you want to cover. We’ll recommend a practical system and send a written quote.',
    heroTitle: 'Residential Solar Installation in Lagos That Keeps Your Home Powered',
    heroCopy:
      'Right-sized solar and battery systems for Lagos homes, planned around the appliances you use and the outages you need to cover.',
    heroImage: '/hero-rooftop-installers.webp',
    heroAlt: 'Installer working on solar panels on a rooftop',
    overviewTitle: 'Home solar planned around how your household actually uses power',
    overview: [
      'A solar package chosen from a catalogue can miss how your home really uses power. The fridge, the fans, the water pump, and the hours you need backup all matter. When those details are overlooked, the system can struggle exactly when you need it most.',
      'We start with your home. We look at your appliances, your daily routine, and your backup priorities, then recommend the panels, inverter, and battery capacity to match. You see the recommendation before anything is installed, and handover explains how to run the system day to day.',
    ],
    benefits: [
      'A recommendation based on your appliances and routine',
      'Panels, inverter, and battery matched to your priority loads',
      'Operating guidance so you know what the system can handle',
    ],
    included: [
      {
        title: 'Home energy assessment',
        description:
          'We review the appliances you use, your daily routine, and the outages you want to plan for.',
      },
      {
        title: 'System recommendation',
        description:
          'Panel, inverter, and battery choices matched to your loads and the space available.',
      },
      {
        title: 'Installation & testing',
        description:
          'Equipment is installed, connected, and checked before the system is handed over.',
      },
      {
        title: 'Guidance & ongoing support',
        description:
          'Understand normal operation, battery use, and the maintenance your system needs.',
      },
    ],
    includedIcons: ['ClipboardCheck', 'Cpu', 'PlugZap', 'Headset'],
    options: [
      {
        title: 'Essential home backup',
        description:
          'Start with priority loads such as lighting, fans, connectivity, and refrigeration.',
      },
      {
        title: 'A broader home setup',
        description: 'Plan for more appliances, with capacity assessed around simultaneous use.',
      },
      {
        title: 'Upgrade an existing system',
        description:
          'Review your current equipment and identify a compatible path to more capacity.',
      },
    ],
    steps: [
      {
        title: 'Share your power needs',
        description:
          'Tell us about your appliances, your property, and the outages you want to plan for.',
        number: '01',
      },
      {
        title: 'Assess & recommend',
        description: 'We review the site and prepare a system recommendation and written quote.',
        number: '02',
      },
      {
        title: 'Install & test',
        description:
          'After you approve the quote, we agree an installation date and test the completed setup.',
        number: '03',
      },
      {
        title: 'Power up with confidence',
        description: 'We explain the controls, recommended usage, and how to get support.',
        number: '04',
      },
    ],
    faqs: [
      {
        question: 'How much does a home solar system cost in Lagos?',
        answer:
          'We do not publish fixed prices, because the right system depends on your loads, battery capacity, and site. After an assessment you receive a written quote to review at your own pace.',
      },
      {
        question: 'Can a home solar system run an air conditioner?',
        answer:
          'It depends on the unit’s power draw and how many appliances run at the same time. We check the air conditioner you plan to use against the proposed capacity and explain what the system can support.',
      },
      {
        question: 'How long will my home battery keep the essentials running?',
        answer:
          'Runtime depends on battery capacity and the load at the time. We estimate it using your priority appliances, so you know what to expect during an outage before the system is installed.',
      },
      {
        question: 'Does solar still work during the rainy season?',
        answer:
          'Yes. Panels still produce power in cloudy and rainy weather, although output can be lower. A correctly sized battery helps cover the difference.',
      },
      {
        question: 'Will someone explain how to run the system after installation?',
        answer:
          'Yes. At handover we explain the controls, how the battery is used, and what routine checks to expect, and we tell you how to get follow-up support.',
      },
    ],
    portfolio: [],
  },
  1: {
    seo: {
      title: 'Commercial Solar Installation in Lagos | AFEEZTECHSOLAR',
      description:
        'Solar and battery backup for Lagos businesses that need dependable power during trading hours. Book a site assessment and quote from AFEEZTECHSOLAR.',
      keyword: 'commercial solar installation Lagos',
    },
    tagline: 'Keep your business moving.',
    ctaTitle: 'Ready to keep your business running through power cuts?',
    ctaCopy:
      'Share your operating hours and priority equipment. We’ll help you find a practical solar and backup plan for your site.',
    heroTitle:
      'Commercial Solar in Lagos That Keeps Your Business Running Through Power Disruptions',
    heroCopy:
      'Solar and battery systems planned around your operating hours, priority equipment, and site access, so disruption to your business stays small.',
    heroImage: '/hero-solar.jpg',
    heroAlt: 'Solar panels on a building under a clear sky',
    overviewTitle: 'Commercial solar planned around your operating hours and priority equipment',
    overview: [
      'A business cannot plan its power around guesswork. Equipment starts at different times, demand changes through the day, and some operations cannot wait for the next supply window. A generic package can overlook those realities and leave the most important parts of the business unprotected.',
      'We build the recommendation around your operation. We review your working hours, equipment, and priority loads before planning generation and backup capacity. Installation is coordinated around site access and any agreed interruptions, with testing and guidance for the people who will use the system.',
    ],
    benefits: [
      'Priority loads identified before any sizing begins',
      'Installation timed around your site access',
      'Guidance for your team on the system’s controls and limits',
    ],
    included: [
      {
        title: 'Operational load review',
        description:
          'Identify essential equipment, operating hours, and the periods of highest demand.',
      },
      {
        title: 'System & backup planning',
        description:
          'Choose a practical balance of solar generation, inverter capacity, and battery storage.',
      },
      {
        title: 'Coordinated installation',
        description:
          'Plan the work around site access and agree any power interruptions in advance.',
      },
      {
        title: 'Testing & team guidance',
        description:
          'Check operation and help the people using the system understand its limits and controls.',
      },
    ],
    includedIcons: ['Gauge', 'Layers', 'Route', 'Headset'],
    options: [
      {
        title: 'Small business essentials',
        description:
          'Prioritise lighting, point-of-sale systems, connectivity, and other key loads.',
      },
      {
        title: 'Office & commercial power',
        description: 'Assess a wider mix of equipment and a more demanding operating schedule.',
      },
      {
        title: 'Existing system review',
        description:
          'Review capacity, reliability concerns, and opportunities to improve your current setup.',
      },
    ],
    steps: [
      {
        title: 'Understand your operation',
        description:
          'Share your business activities, equipment, and the main power problems you face.',
        number: '01',
      },
      {
        title: 'Survey & propose',
        description:
          'We review the site, identify priority loads, and prepare a tailored written quote.',
        number: '02',
      },
      {
        title: 'Coordinate & install',
        description: 'Agree access and timing, then install and test the approved system.',
        number: '03',
      },
      {
        title: 'Handover & support',
        description:
          'Your team receives operating guidance and a clear route for follow-up support.',
        number: '04',
      },
    ],
    faqs: [
      {
        question: 'How much does a commercial solar system cost?',
        answer:
          'We do not publish fixed prices. The system depends on your priority loads, operating hours, and site. After a survey you receive a written quote with the scope clearly set out.',
      },
      {
        question: 'Can solar power our whole business?',
        answer:
          'Not always. The answer depends on your priority equipment, operating hours, and available roof or site space. We identify which loads a system should carry and explain any that need a different arrangement.',
      },
      {
        question: 'Will our business need to close during installation?',
        answer:
          'Some installation work may need short, agreed interruptions. We plan the timing with you in advance and confirm any interruption before it happens.',
      },
      {
        question: 'What information do you need for a business quote?',
        answer:
          'Share a list of key equipment and operating hours, your main power challenges, and any site access details. Recent electricity bills or generator fuel records also help us size the system.',
      },
      {
        question: 'Do you provide support after handover?',
        answer:
          'Yes. Your team receives operating guidance at handover and a clear route for follow-up questions about the system.',
      },
    ],
    portfolio: [],
  },
  2: {
    seo: {
      title: 'Inverter AC & Washing Machine Installation in Lagos | AFEEZTECHSOLAR',
      description:
        'Professional inverter AC and washing machine installation in Lagos, with location checks, connection planning, and operating guidance before you use them.',
      keyword: 'inverter AC installation Lagos',
    },
    tagline: 'Everyday appliances. Thoughtfully installed.',
    ctaTitle: 'Ready to install your appliance the right way?',
    ctaCopy:
      'Share the model and the location. We’ll explain the requirements and the work involved before you commit.',
    heroTitle: 'Inverter AC & Washing Machine Installation in Lagos, Planned Around Your Space',
    heroCopy:
      'We check the model, the location, and the connections first, then carry out the agreed installation and explain how to use and care for the appliance.',
    heroImage: null,
    heroAlt: '',
    overviewTitle: 'Appliance installation that starts with the location and the connections',
    overview: [
      'An efficient appliance still needs the right installation. An unsuitable position, an overlooked power requirement, or a poorly planned water or drainage connection can turn a useful purchase into a daily frustration. Connecting the appliance is only part of the job.',
      'We look at the model, the space, and the connections before recommending the next step. We then carry out the agreed installation or support work around your property, check the appliance in operation, and explain the controls and care that matter for everyday use.',
    ],
    benefits: [
      'Model and location checked before any work starts',
      'Power, drainage, and water needs reviewed for the appliance',
      'Operating checks and simple guidance at handover',
    ],
    included: [
      {
        title: 'Appliance & location review',
        description: 'Check the model, the intended position, and the installation requirements.',
      },
      {
        title: 'Connection planning',
        description:
          'Review the power, drainage, water, or mounting requirements for the appliance.',
      },
      {
        title: 'Installation & setup',
        description: 'Complete the agreed installation and check the appliance in operation.',
      },
      {
        title: 'Practical support',
        description: 'Get guidance on normal use and the next steps if a problem needs attention.',
      },
    ],
    includedIcons: ['ClipboardCheck', 'Droplets', 'Wrench', 'Headset'],
    options: [
      {
        title: 'Inverter AC installation',
        description: 'Discuss the unit, the room, the mounting position, and electrical needs.',
      },
      {
        title: 'Washing machine setup',
        description: 'Review the location, water supply, drainage, and power connection.',
      },
      {
        title: 'Existing appliance support',
        description:
          'Describe the issue and share the model so we can assess the appropriate next step.',
      },
    ],
    steps: [
      {
        title: 'Tell us about the appliance',
        description: 'Share the model, the location, and whether you need installation or support.',
        number: '01',
      },
      {
        title: 'Check the requirements',
        description: 'We review the site connections and explain the proposed work and quote.',
        number: '02',
      },
      {
        title: 'Install or address the issue',
        description:
          'Once you approve the quote, we carry out the agreed work and operating checks.',
        number: '03',
      },
      {
        title: 'Get ready for everyday use',
        description: 'We explain the relevant controls, care requirements, and follow-up support.',
        number: '04',
      },
    ],
    faqs: [
      {
        question: 'How much does inverter AC or washing machine installation cost?',
        answer:
          'We do not publish fixed prices, because the work depends on the model, the location, and the connections needed. We explain the proposed work and send a written quote before anything is agreed.',
      },
      {
        question: 'Can you review a model before I buy it?',
        answer:
          'Yes. Share the model you are considering and where it will go. We can explain what the installation needs, so you know what to prepare before you buy.',
      },
      {
        question: 'What does a washing machine need from my supply?',
        answer:
          'A suitable power point, a water supply, and a drain point. We check each one during the review, so the machine is set up in a suitable position.',
      },
      {
        question: 'What if an appliance I already have is not working?',
        answer:
          'Describe the problem and share the model. We will explain what we think the next step is and what it would involve before any work is agreed.',
      },
      {
        question: 'Do you explain how to look after the appliance?',
        answer:
          'Yes. We explain the controls and the everyday care that matter for the appliance, and how to get follow-up support if something needs attention.',
      },
    ],
    portfolio: [],
  },
  3: {
    seo: {
      title: 'Electronic Repair in Lagos | AFEEZTECHSOLAR',
      description:
        'Electronic repair in Lagos with careful diagnosis before any parts are replaced. Get a clear explanation of the fault and your next step from AFEEZTECHSOLAR.',
      keyword: 'electronics repair Lagos',
    },
    tagline: 'Find the fault. Understand the next step.',
    ctaTitle: 'Want a clear answer about your equipment?',
    ctaCopy:
      'Describe the fault and the model. We’ll explain what we find and the options before any repair is agreed.',
    heroTitle: 'Electronic Repair in Lagos That Starts With a Clear Diagnosis',
    heroCopy:
      'We find the underlying fault first, explain it in plain language, and agree the next step before any repair work goes ahead.',
    heroImage: null,
    heroAlt: '',
    overviewTitle: 'Electronic repairs for people who want answers, not another guess',
    overview: [
      'Replacing parts without understanding the fault can mean repeated problems, wasted time, and another repair bill. A device that powers on briefly has not necessarily had its underlying issue resolved. You need a clear explanation of what is wrong and whether a repair makes sense before deciding how to proceed.',
      'We begin with the symptoms, the equipment history, and a careful assessment. We explain the practical options, discuss any parts that may be needed, and agree on the work before it starts. Relevant functions are checked before the equipment is handed back.',
    ],
    benefits: [
      'A diagnosis before any repair is agreed',
      'Plain-language explanation of the fault and the options',
      'Relevant functions checked before handover',
    ],
    included: [
      {
        title: 'Fault information review',
        description:
          'Understand the symptoms, the equipment history, and the conditions around the problem.',
      },
      {
        title: 'Diagnostic assessment',
        description: 'Inspect the equipment to identify the likely issue and practical next steps.',
      },
      {
        title: 'Agreed repair work',
        description:
          'Discuss the proposed repair and any parts required before carrying out approved work.',
      },
      {
        title: 'Function checks & guidance',
        description:
          'Check the repaired functions and explain relevant care or usage considerations.',
      },
    ],
    includedIcons: ['Search', 'Eye', 'Hammer', 'ShieldCheck'],
    options: [
      {
        title: 'Equipment not working',
        description: 'Start with a clear description of the failure and the equipment model.',
      },
      {
        title: 'Intermittent problems',
        description: 'Share when the problem happens and any warning signs or error messages.',
      },
      {
        title: 'Repair or replace?',
        description: 'Ask for an assessment to help decide whether a repair is practical.',
      },
    ],
    steps: [
      {
        title: 'Describe the fault',
        description: 'Tell us what the equipment is doing and share its model and history.',
        number: '01',
      },
      {
        title: 'Assess & explain',
        description: 'We investigate the issue and explain the proposed repair and quote.',
        number: '02',
      },
      {
        title: 'Approve & repair',
        description:
          'We carry out the agreed work, subject to the equipment’s condition and any parts needed.',
        number: '03',
      },
      {
        title: 'Test & hand over',
        description: 'We check the relevant functions and share care and follow-up guidance.',
        number: '04',
      },
    ],
    faqs: [
      {
        question: 'Will you tell me whether a repair is worth it before I pay?',
        answer:
          'Yes. After the assessment we explain the likely fault, the options, and whether a repair is practical. The quote is shared before any approved work begins.',
      },
      {
        question: 'What should I tell you when I bring equipment in?',
        answer:
          'Describe what the equipment is doing, when the problem happens, and any warning signs or error messages. Share the model number and any previous repairs you know about.',
      },
      {
        question: 'Do you replace parts without checking the fault first?',
        answer:
          'No. We aim to identify the fault first. Any parts needed are discussed with you before they are fitted, so you know what is being changed and why.',
      },
      {
        question: 'Is there a charge for the assessment?',
        answer:
          'Please ask when you make your enquiry, so we can confirm the assessment arrangements for your equipment before anything is booked.',
      },
      {
        question: 'Can you check the equipment works after the repair?',
        answer:
          'Yes. We check the relevant functions after the work and explain any care or usage points that help the equipment last.',
      },
    ],
    portfolio: [],
  },
  4: {
    seo: {
      title: 'Electrical Wiring Installation in Lagos | AFEEZTECHSOLAR',
      description:
        'Electrical wiring for homes, offices, and other properties in Lagos, planned around your loads and existing wiring. Request a site assessment today.',
      keyword: 'electrical wiring installation Lagos',
    },
    tagline: 'A sound foundation for everyday power.',
    ctaTitle: 'Ready to plan wiring that suits your property?',
    ctaCopy:
      'Tell us about the space and the equipment you plan to run. We’ll agree the scope and send a written quote.',
    heroTitle:
      'Electrical Wiring in Lagos Planned Around Your Loads, Your Connections, and Your Property',
    heroCopy:
      'Wiring layouts planned around the equipment you will run, with checks before handover so the completed work is ready for everyday use.',
    heroImage: null,
    heroAlt: '',
    overviewTitle: 'Electrical wiring planned around real use, not a quick look at a floor plan',
    overview: [
      'More sockets do not automatically mean more capacity. A wiring layout that ignores the equipment it serves can leave a property with inconvenient connections, unreliable circuits, and problems that are harder to fix once the finish is complete.',
      'We assess the property, the intended loads, and the existing installation before agreeing on the work. We plan routes and connection points around your requirements, carry out the approved wiring, and check the completed installation before handover.',
    ],
    benefits: [
      'Circuits and connection points planned around your equipment',
      'Existing installation considered before new work is added',
      'Completed work checked before handover',
    ],
    included: [
      {
        title: 'Site & load assessment',
        description:
          'Review the property, the intended equipment, and the existing electrical conditions.',
      },
      {
        title: 'Wiring scope & layout',
        description:
          'Plan the agreed circuits, routes, and connection points around your requirements.',
      },
      {
        title: 'Professional installation',
        description:
          'Carry out the approved wiring with attention to organisation and workmanship.',
      },
      {
        title: 'Testing & explanation',
        description: 'Check the completed work and explain any usage or follow-up considerations.',
      },
    ],
    includedIcons: ['ClipboardCheck', 'Route', 'Plug', 'Gauge'],
    options: [
      {
        title: 'New property wiring',
        description: 'Plan electrical points and circuits for a home, office, or other property.',
      },
      {
        title: 'Renovations & additions',
        description: 'Assess how new rooms, appliances, or loads fit the existing installation.',
      },
      {
        title: 'Existing wiring concerns',
        description:
          'Arrange an assessment for faults, damaged connections, or unreliable circuits.',
      },
    ],
    steps: [
      {
        title: 'Discuss the property',
        description:
          'Tell us about the space, the planned equipment, and the electrical work you need.',
        number: '01',
      },
      {
        title: 'Assess & plan',
        description: 'We review the site and agree on the layout, scope, and written quote.',
        number: '02',
      },
      {
        title: 'Complete the wiring',
        description: 'Schedule access with you and carry out the approved work.',
        number: '03',
      },
      {
        title: 'Test & hand over',
        description: 'We check the installation and explain the relevant operating information.',
        number: '04',
      },
    ],
    faqs: [
      {
        question: 'How much does electrical wiring cost in Lagos?',
        answer:
          'We do not publish fixed prices, because the cost depends on the size of the property, the number of points, and the existing installation. You receive a written quote after the site assessment.',
      },
      {
        question: 'Can you wire a new room in an existing building?',
        answer:
          'Often, yes. We assess how the new room fits the existing installation, including the load it will carry, before agreeing the route and connections.',
      },
      {
        question: 'Do you check existing wiring before adding to it?',
        answer:
          'Yes. We review the existing installation as part of the assessment, so new work connects to it safely and sensibly. Any concerns we find are explained before work is agreed.',
      },
      {
        question: 'Will you explain the layout after the work is finished?',
        answer:
          'Yes. At handover we explain the circuits and connection points, so you know how the installation is organised and what it is intended to power.',
      },
      {
        question: 'How long does a wiring project take?',
        answer:
          'It depends on the scope and access to the property. We confirm the timing with you when the scope is agreed, so the schedule is clear before work starts.',
      },
    ],
    portfolio: [],
  },
  5: {
    seo: {
      title: 'Conduit & Surface Installation in Lagos | AFEEZTECHSOLAR',
      description:
        'Conduit and surface cable installation in Lagos for protected, organised routes that stay accessible. Request a site review and quote from AFEEZTECHSOLAR.',
      keyword: 'conduit installation Lagos',
    },
    tagline: 'Organised routes. A cleaner finish.',
    ctaTitle: 'Ready for a cleaner, more organised installation?',
    ctaCopy:
      'Tell us about your property and preferred finish. We’ll recommend routes and a method that suits your building.',
    heroTitle: 'Conduit & Surface Installation in Lagos for Protected, Organised Cable Routes',
    heroCopy:
      'Cable routes planned around your building, your connection points, and the finish you want, so the installation stays tidy and easy to reach later.',
    heroImage: null,
    heroAlt: '',
    overviewTitle:
      'A cleaner, more organised installation for property owners who care about the finish',
    overview: [
      'Cable routes are easy to overlook until they get in the way. Runs that have not been planned around the property can create an untidy finish, awkward access, and unnecessary disruption when something needs attention. The right route matters as much as the connection at the end of it.',
      'We review your layout, access, and connection points before recommending conduit or surface installation. We explain the trade-offs, agree the routes and scope, and carry out the work with attention to protection, organisation, and future access.',
    ],
    benefits: [
      'Routes planned around your building and finish',
      'Conduit or surface method explained before work starts',
      'Future access considered when routes are agreed',
    ],
    included: [
      {
        title: 'Property & route review',
        description:
          'Assess the structure, access, and the points the installation needs to serve.',
      },
      {
        title: 'Method recommendation',
        description:
          'Discuss conduit or surface routing and how each one fits your property and finish.',
      },
      {
        title: 'Installation & organisation',
        description:
          'Install the agreed routes and fittings with attention to protection and layout.',
      },
      {
        title: 'Checks & handover',
        description:
          'Review the finished work and explain access or future maintenance considerations.',
      },
    ],
    includedIcons: ['Route', 'Layers', 'Cable', 'ShieldCheck'],
    options: [
      {
        title: 'Conduit installation',
        description: 'Plan protected routes as part of a new build or a suitable renovation.',
      },
      {
        title: 'Surface installation',
        description: 'Discuss accessible routing for an existing property or an extension.',
      },
      {
        title: 'Route improvements',
        description:
          'Review untidy or unsuitable cable runs and agree on a practical improvement plan.',
      },
    ],
    steps: [
      {
        title: 'Share your layout',
        description:
          'Tell us about your property, the connection points, and your preferred finish.',
        number: '01',
      },
      {
        title: 'Survey & agree routes',
        description: 'We assess access and recommend an installation method with a written quote.',
        number: '02',
      },
      {
        title: 'Install & organise',
        description: 'Carry out the approved routing and the associated installation work.',
        number: '03',
      },
      {
        title: 'Review the finish',
        description: 'Check the completed routes and explain future access considerations.',
        number: '04',
      },
    ],
    faqs: [
      {
        question: 'What is the difference between conduit and surface installation?',
        answer:
          'Conduit runs cables inside protective tubing, usually built into the structure. Surface installation runs them visibly along walls or ceilings. We recommend the method that suits your building and finish.',
      },
      {
        question: 'Can you improve cables that are already untidy?',
        answer:
          'Yes. We review the existing runs and agree a practical improvement plan. You see the proposed changes and the quote before any work begins.',
      },
      {
        question: 'Will the routes still be accessible later?',
        answer:
          'We plan routes with future access in mind, and we explain where access points or maintenance considerations apply once the installation is complete.',
      },
      {
        question: 'Can conduit be added to an existing building?',
        answer:
          'It can, depending on the building and the route. We assess the structure and access during the review and explain which options are practical before agreeing the work.',
      },
      {
        question: 'Do you need the building to be finished first?',
        answer:
          'Not always. The best timing depends on the stage of the build or renovation. We talk through the sequence when we review your property.',
      },
    ],
    portfolio: [],
  },
  6: {
    seo: {
      title: 'CCTV Installation & Repair in Lagos | AFEEZTECHSOLAR',
      description:
        'CCTV installation and repair in Lagos for homes and businesses, with coverage planning, fault finding, and viewing guidance. Request a quote today.',
      keyword: 'CCTV installation Lagos',
    },
    tagline: 'A clearer view of your property.',
    ctaTitle: 'Ready to see your property more clearly?',
    ctaCopy:
      'Tell us which areas you need to watch. We’ll recommend coverage and explain the viewing options before any work starts.',
    heroTitle: 'CCTV Installation & Repair in Lagos for Clearer Coverage of Your Property',
    heroCopy:
      'Camera positions chosen around the areas you need to see, plus fault finding for existing systems, with clear guidance on viewing and recording.',
    heroImage: null,
    heroAlt: '',
    overviewTitle: 'CCTV that covers what matters, and repairs that find the real fault',
    overview: [
      'More cameras do not always mean better coverage. Poor positioning, overlooked blind spots, and a recorder that is not set up for your needs can leave important areas out of view. An existing system with missing video or recording problems needs more than another camera added to the wall.',
      'We start with the areas you need to monitor, the layout of the property, and any equipment already in place. We assess positions, connections, and recording requirements before recommending installation or repair work. Relevant functions are tested, and everyday operation is explained.',
    ],
    benefits: [
      'Camera positions chosen around the areas you need to see',
      'Existing equipment and connections checked before a repair',
      'Viewing and recording explained at handover',
    ],
    included: [
      {
        title: 'Coverage & site review',
        description: 'Discuss the entrances, shared areas, or other locations you need to monitor.',
      },
      {
        title: 'Equipment & connection plan',
        description: 'Review camera positions, recording needs, cabling, and available power.',
      },
      {
        title: 'Installation or repair',
        description:
          'Complete the agreed setup or troubleshoot an existing system and its connections.',
      },
      {
        title: 'Testing & user guidance',
        description:
          'Check the camera views and recording functions, then explain everyday operation.',
      },
    ],
    includedIcons: ['Eye', 'Cctv', 'Cable', 'Headset'],
    options: [
      {
        title: 'A new CCTV setup',
        description: 'Plan camera coverage and recording for a home or business.',
      },
      {
        title: 'Expand an existing system',
        description: 'Review compatibility before adding cameras or changing the coverage.',
      },
      {
        title: 'Troubleshoot a fault',
        description: 'Investigate missing video, recording issues, or connection problems.',
      },
    ],
    steps: [
      {
        title: 'Discuss your coverage',
        description:
          'Share the property layout, the areas of concern, and any existing system details.',
        number: '01',
      },
      {
        title: 'Assess & recommend',
        description:
          'We review positions, connections, and equipment before preparing a written quote.',
        number: '02',
      },
      {
        title: 'Install or troubleshoot',
        description:
          'Complete the approved installation or repair and check the relevant functions.',
        number: '03',
      },
      {
        title: 'View & manage',
        description: 'Learn how to access your system and handle everyday viewing and recording.',
        number: '04',
      },
    ],
    faqs: [
      {
        question: 'How many cameras do I need?',
        answer:
          'It depends on the areas you need to see and how the property is laid out. We agree the coverage plan with you first, then recommend the number and position of cameras.',
      },
      {
        question: 'Can you add cameras to my existing CCTV system?',
        answer:
          'Often, yes, but compatibility matters. We check the existing recorder and equipment before adding cameras, so the expansion works with what you already have.',
      },
      {
        question: 'My camera shows no picture. Can you find out why?',
        answer:
          'We can investigate missing video. The cause may be the camera, the cabling, the power supply, or the recorder, so we check each part and explain what we find before any repair.',
      },
      {
        question: 'Can I view the cameras on my phone?',
        answer:
          'Remote viewing depends on the equipment and network you use. We confirm what your system supports and explain how to access it as part of the handover.',
      },
      {
        question: 'How long is footage kept?',
        answer:
          'Recording time depends on the storage capacity and the camera settings. We explain how the recorder is set up and how to check the storage during handover.',
      },
    ],
    portfolio: [],
  },
};
