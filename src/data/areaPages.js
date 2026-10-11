// Location-specific page content for /areas/:slug, keyed by area slug.
//
// Content rules (same as service pages):
// - No prices, guarantees, warranty periods, response times, office addresses, or local projects.
// - Local considerations describe what we check for a property type, not work completed there.
// - `gallery` stays empty until real photographs of completed local projects are supplied.
// - `reviewLocations` matches the location label on a genuine review in reviews.js. When no review
//   matches, the page shows general reviews and does not imply where the reviewer lives.
// - `seo.keyword` is a reasoned search-intent target, not keyword-tool data.
// - `featuredServiceIds` picks 4 to 5 services that suit the property type. Every service is one the
//   business offers; the selection is editorial.

export const areaPages = {
  ikoyi: {
    heroTitle: 'Solar and backup power in Ikoyi, planned around your home or apartment',
    seo: {
      title: 'Solar & Backup Power in Ikoyi | AFEEZTECHSOLAR',
      description:
        'Solar, inverter and battery backup planning for Ikoyi homes and apartments. Request a free site inspection and a written quote from AFEEZTECHSOLAR.',
      keyword: 'solar and backup power Ikoyi',
    },
    aboutTitle: 'Power planning shaped by how Ikoyi properties are built.',
    aboutParagraphs: [
      'Ikoyi homes range from detached houses to apartments in shared buildings. The right backup plan depends on where your essential circuits sit, how the existing wiring is arranged, and whether a battery or inverter has a safe, accessible place to go.',
      'We start with the circuits you need during an outage and your daily routine. We then check the roof or space and the building rules that apply to you. You receive a written recommendation and quote to review before any equipment is ordered.',
    ],
    accessNote:
      'Share your building or estate contact so we can confirm access, roof or space permissions, and a visit time.',
    assessmentNote:
      'We check your existing wiring, the space for an inverter or battery, and whether your building allows any roof or wall work.',
    featuredServiceIds: ['0', '2', '4', '6'],
    nearby: ['banana-island', 'victoria-island', 'oniru'],
    reviewLocations: [],
    faqs: [
      {
        question: 'Do you take enquiries for Ikoyi properties?',
        answer:
          'Yes. Send us your address and the circuits you want to back up. We confirm access and availability before arranging a site visit.',
      },
      {
        question: 'Can you add backup to an apartment in a shared building?',
        answer:
          'Often, but it depends on the building’s rules and the space available for equipment. We check these with you before recommending a system, and agree any roof or wall work with building management first.',
      },
      {
        question: 'How long does an installation take?',
        answer:
          'It depends on system size, access and any wiring that needs upgrading. We confirm the expected timeline in your written quote after the site assessment.',
      },
      {
        question: 'Will I know the cost before work starts?',
        answer:
          'Yes. Costs depend on your equipment and site, so we assess first and give you a written quote to review. Nothing is installed until you approve it.',
      },
      {
        question: 'What support is there after installation?',
        answer:
          'We walk you through the system and explain how to use it. Support and any warranty terms are set out in your written quote, so you can review them before you decide.',
      },
    ],
  },
  'banana-island': {
    heroTitle: 'Solar backup for Banana Island homes, planned around estate access',
    seo: {
      title: 'Solar & Backup Power in Banana Island | AFEEZTECHSOLAR',
      description:
        'Solar backup planning for Banana Island homes, with estate access agreed before every visit. Request a free site inspection and a written quote.',
      keyword: 'solar backup Banana Island',
    },
    aboutTitle: 'Planning for larger homes on a gated island estate.',
    aboutParagraphs: [
      'Banana Island homes often have larger roofs, more rooms and a wider mix of appliances. Backup planning starts with the circuits you need during an outage, such as lighting, cooling, security and water pumping, rather than the total size of the house.',
      'Estate entry and contractor access are part of the plan from the start. We agree visit times in advance and keep the work area tidy, so your household can keep its routine while we work.',
    ],
    accessNote:
      'Tell us your estate entry requirements, preferred visit times, and who we should contact on site.',
    assessmentNote:
      'We review roof access, equipment space, cable routes, and the loads you want to keep running during an outage.',
    featuredServiceIds: ['0', '2', '4', '6'],
    nearby: ['ikoyi', 'victoria-island', 'lekki-phase-1'],
    reviewLocations: [],
    faqs: [
      {
        question: 'Do you serve homes on Banana Island?',
        answer:
          'We take enquiries for Banana Island properties. Because estate entry rules apply, we confirm access with you before arranging a site visit.',
      },
      {
        question: 'What do you need from us before a visit?',
        answer:
          'Your estate contact details, the entry requirements, a preferred visit time, and a short list of the appliances you want to keep running during an outage.',
      },
      {
        question: 'Can a large home be backed up in parts?',
        answer:
          'Yes. Many households back up essential circuits first, such as lighting, cooling and security, and add more later if needed. We discuss this during the assessment.',
      },
      {
        question: 'How long does an installation take?',
        answer:
          'It depends on system size, roof access and the wiring involved. We confirm the timeline in your written quote after the site assessment.',
      },
      {
        question: 'What support is there after handover?',
        answer:
          'We explain how the system works at handover. Support and warranty terms are set out in your written quote before you approve the work.',
      },
    ],
  },
  'victoria-island': {
    heroTitle: 'Solar and inverter power for Victoria Island offices and homes',
    seo: {
      title: 'Solar & Power Backup in Victoria Island | AFEEZTECHSOLAR',
      description:
        'Solar and inverter backup for Victoria Island offices, shops and homes, planned around working hours and critical equipment. Get a free site inspection.',
      keyword: 'solar power backup Victoria Island',
    },
    aboutTitle: 'Backup plans built around working hours and critical equipment.',
    aboutParagraphs: [
      'Victoria Island businesses rely on lights, computers, payment terminals and refrigeration during working hours. We begin by separating the equipment that must stay on from the equipment that can wait, so the system size matches your real needs.',
      'Offices and homes in mixed-use buildings also need coordination with building management. We agree on access, installation timing and equipment placement before any work begins.',
    ],
    accessNote:
      'Tell us your building management contact, your working hours, and any times when installation must avoid disruption.',
    assessmentNote:
      'We review your critical equipment, the existing supply setup, space for an inverter or battery, and the building’s access rules.',
    featuredServiceIds: ['1', '4', '6', '0'],
    nearby: ['ikoyi', 'oniru', 'banana-island'],
    reviewLocations: [],
    faqs: [
      {
        question: 'Do you take enquiries from Victoria Island businesses and homes?',
        answer:
          'Yes. Share your building and what you need to power, and we will confirm access and availability before arranging a site visit.',
      },
      {
        question: 'Can you plan backup around our opening hours?',
        answer:
          'Yes. We discuss your working hours and critical equipment during the assessment, then agree installation timing that suits your business.',
      },
      {
        question: 'Which equipment should be on the backup circuit?',
        answer:
          'Usually the equipment that must keep working during an outage, such as lighting, network equipment, payment terminals and refrigeration. We confirm the list after reviewing your current setup.',
      },
      {
        question: 'Do building management approvals affect installation?',
        answer:
          'They can. Roof, wall and cable routes often need agreement first, so we check these with you and your building manager before work starts.',
      },
      {
        question: 'Will I receive a written quote before approving work?',
        answer:
          'Yes. We assess your site and send a written quote for you to review. Nothing is installed until you approve it.',
      },
    ],
  },
  'lekki-phase-1': {
    heroTitle: 'Solar power in Lekki Phase 1, sized to how your home uses electricity',
    seo: {
      title: 'Solar & Backup Power in Lekki Phase 1 | AFEEZTECHSOLAR',
      description:
        'Solar and battery systems for Lekki Phase 1 homes, sized around air conditioning, water pumps and your backup hours. Request a free site inspection.',
      keyword: 'solar power Lekki Phase 1',
    },
    aboutTitle: 'Systems sized for air conditioning, pumps and everyday loads.',
    aboutParagraphs: [
      'Lekki Phase 1 homes often run air conditioners and water pumps for long hours. A useful plan starts by reviewing how each appliance is used, when outages happen, and how many hours of backup you need.',
      'Shading from nearby buildings and the available roof space both affect a solar installation. We check these on site and discuss what can be added later, so the first system fits your present needs and leaves room to grow.',
    ],
    accessNote:
      'Share your property details, any estate requirements, and the times you prefer for a site visit.',
    assessmentNote:
      'We check roof space and shading, the appliances on your backup circuits, and where batteries and inverters can be placed safely.',
    featuredServiceIds: ['0', '2', '3', '4', '5'],
    nearby: ['ikate-elegushi', 'osapa-london', 'chevron'],
    reviewLocations: ['Lekki, Lagos'],
    faqs: [
      {
        question: 'Do you cover Lekki Phase 1?',
        answer:
          'We take enquiries for Lekki Phase 1. We confirm your exact address, access and availability before arranging a site visit.',
      },
      {
        question: 'Can a system run an air conditioner and a water pump?',
        answer:
          'It depends on the appliance ratings, how often they run and the backup hours you want. We size the system after reviewing those details, so you know what it can and cannot carry.',
      },
      {
        question: 'Can the system be expanded later?',
        answer:
          'Often, yes. We plan the first installation with future additions in mind and discuss the options during your assessment.',
      },
      {
        question: 'How long does installation take?',
        answer:
          'It depends on system size, roof access and any wiring work. We confirm the timeline in your written quote.',
      },
      {
        question: 'Will you check my existing wiring first?',
        answer:
          'Yes. Existing wiring affects what can be safely connected, so we check it during the site assessment before recommending equipment.',
      },
    ],
  },
  oniru: {
    heroTitle: 'Solar and battery backup in Oniru for homes and workspaces',
    seo: {
      title: 'Solar & Battery Backup in Oniru | AFEEZTECHSOLAR',
      description:
        'Solar and battery backup for Oniru apartments, homes and workspaces, with equipment placement agreed before installation. Request a free site inspection.',
      keyword: 'solar battery backup Oniru',
    },
    aboutTitle: 'Backup planning for apartments, homes and working spaces.',
    aboutParagraphs: [
      'Oniru properties range from apartments and family homes to spaces used for work. Each needs a different balance of backup hours, equipment size and placement, so we start by agreeing on what the system must power.',
      'Batteries and inverters need a dry, ventilated and accessible location. In shared buildings we check where equipment can go and which cable routes are permitted before we recommend a layout.',
    ],
    accessNote:
      'Tell us whether your property is a shared building, and who we should coordinate access with.',
    assessmentNote:
      'We check where batteries and inverters can be placed, the cable routes available, and the loads you want to back up.',
    featuredServiceIds: ['0', '1', '4', '6'],
    nearby: ['victoria-island', 'ikoyi', 'lekki-phase-1'],
    reviewLocations: [],
    faqs: [
      {
        question: 'Do you take enquiries for Oniru?',
        answer:
          'Yes. Send your address and what you want to power, and we will confirm access and availability before any visit.',
      },
      {
        question: 'Can a battery be installed in a shared building?',
        answer:
          'Sometimes. We check the location for ventilation and access, and any change to shared spaces must be agreed with building management first.',
      },
      {
        question: 'Can you power a home office during outages?',
        answer:
          'Yes, if the office circuits are part of the backup plan. We agree on the equipment to include and the backup hours you need during your assessment.',
      },
      {
        question: 'How long does installation take?',
        answer:
          'It depends on system size, access and wiring. The timeline is confirmed in your written quote after the site assessment.',
      },
      {
        question: 'Will I get a written quote first?',
        answer:
          'Yes. We assess your site and provide a written quote to review. Nothing is installed until you approve it.',
      },
    ],
  },
  'ikate-elegushi': {
    heroTitle: 'Solar and inverter installation in Ikate Elegushi for steadier power',
    seo: {
      title: 'Solar & Inverter Work in Ikate Elegushi | AFEEZTECHSOLAR',
      description:
        'Solar, inverter and electrical work in Ikate Elegushi, starting with a check of your existing setup. Request a free site inspection and written quote.',
      keyword: 'solar inverter installation Ikate Elegushi',
    },
    aboutTitle: 'A clear starting point, built on your existing electrical setup.',
    aboutParagraphs: [
      'Many Ikate Elegushi homes and small businesses already have an inverter or generator, with a mix of older and newer wiring. Before we recommend a solar or battery system, we check what is in place so the new work connects safely.',
      'We prioritise the rooms and appliances you need during outages and plan the work around any building activity nearby. You receive a clear recommendation and a written quote to review before anything is installed.',
    ],
    accessNote:
      'Tell us about your current inverter or generator setup, and any building work or access limits we should plan around.',
    assessmentNote:
      'We inspect your existing electrical setup, check the condition of the wiring, and confirm where new equipment can be fitted.',
    featuredServiceIds: ['0', '2', '3', '4'],
    nearby: ['lekki-phase-1', 'osapa-london', 'chevron'],
    reviewLocations: ['Lekki, Lagos'],
    faqs: [
      {
        question: 'Do you accept enquiries for Ikate Elegushi?',
        answer:
          'Yes. Send us your address and the appliances you need to power. We confirm access and availability before arranging a visit.',
      },
      {
        question: 'Can you work with an inverter I already have?',
        answer:
          'Often. We check the existing inverter, batteries and wiring during the assessment and recommend whether to keep, upgrade or replace them.',
      },
      {
        question: 'Do you check my existing wiring first?',
        answer:
          'Yes. We inspect your current electrical setup before recommending equipment, so any necessary repairs are identified early.',
      },
      {
        question: 'How long does an installation take?',
        answer:
          'It depends on system size, access and any wiring work. We confirm the timeline in your written quote.',
      },
      {
        question: 'Will I know the cost before work starts?',
        answer:
          'Yes. We assess your site and send a written quote for you to review. Nothing is installed until you approve it.',
      },
    ],
  },
  'osapa-london': {
    heroTitle: 'Solar and battery power in Osapa London for dependable everyday use',
    seo: {
      title: 'Solar & Battery Power in Osapa London | AFEEZTECHSOLAR',
      description:
        'Solar and battery power for Osapa London homes and businesses, planned around daily use and maintenance access. Request a free site inspection.',
      keyword: 'solar battery power Osapa London',
    },
    aboutTitle: 'Everyday power planned around how your property is used.',
    aboutParagraphs: [
      'In Osapa London, households and businesses often want backup that is simple to live with. We start with your daily routine, the appliances that matter most and the hours you want covered, so the system fits real use.',
      'Maintenance access matters as much as installation. We discuss how equipment will be reached for checks later, and agree on placement and cable routes before recommending the layout.',
    ],
    accessNote:
      'Share your property details, any estate access rules, and the times you prefer for a visit.',
    assessmentNote:
      'We review your daily use, mounting options, and safe equipment placement, including how the equipment will be reached for maintenance.',
    featuredServiceIds: ['0', '2', '4', '5'],
    nearby: ['lekki-phase-1', 'chevron', 'ikate-elegushi'],
    reviewLocations: ['Lekki, Lagos'],
    faqs: [
      {
        question: 'Do you cover Osapa London?',
        answer:
          'We take enquiries for Osapa London. We confirm your address, access and availability before arranging a site visit.',
      },
      {
        question: 'What maintenance access should we plan for?',
        answer:
          'We agree on where equipment will be placed and how it can be reached for checks. This is discussed before the recommendation, not after.',
      },
      {
        question: 'Do you install surface or conduit wiring?',
        answer:
          'Both are possible. The better option depends on the building and the route, so we look at the choices during your assessment and explain them before any work.',
      },
      {
        question: 'How long does an installation take?',
        answer:
          'It depends on system size, access and any wiring work. We confirm the timeline in your written quote.',
      },
      {
        question: 'Will I get a written quote first?',
        answer:
          'Yes. We assess your site and send a written quote to review. Nothing is installed until you approve it.',
      },
    ],
  },
  chevron: {
    heroTitle: 'Solar and backup power around Chevron, Lekki, for homes and businesses',
    seo: {
      title: 'Solar & Backup Power in Chevron, Lekki | AFEEZTECHSOLAR',
      description:
        'Solar and backup power for Chevron, Lekki homes and businesses, with estate access confirmed before the site visit. Request a free site inspection.',
      keyword: 'solar backup power Chevron Lekki',
    },
    aboutTitle: 'Practical power planning for Chevron homes and businesses.',
    aboutParagraphs: [
      'Around Chevron, homes and businesses often combine household appliances, office equipment and security systems. We separate essential loads from heavier appliances, so your backup plan is sized for what you need during an outage.',
      'Estate access and the available roof or wall space shape the design. We confirm these details before any visit, so the assessment is practical and the installation is planned around your property.',
    ],
    accessNote:
      'Share your estate, exact address and any entry requirements, so we can confirm access before a visit.',
    assessmentNote:
      'We review heavy appliances alongside essential daily loads, and plan equipment and cabling around the space available.',
    featuredServiceIds: ['0', '1', '2', '6'],
    nearby: ['lekki-phase-1', 'osapa-london', 'ikate-elegushi'],
    reviewLocations: ['Lekki, Lagos'],
    faqs: [
      {
        question: 'Do you take enquiries for Chevron?',
        answer:
          'Yes. Send your estate and address with what you need to power. We confirm access and availability before arranging a site visit.',
      },
      {
        question: 'Do estate rules affect where panels can go?',
        answer:
          'They can. Estate rules and roof access may limit where panels or equipment can go, so we confirm these before recommending a layout.',
      },
      {
        question: 'Can you plan around heavy appliances?',
        answer:
          'Yes. We review the appliances you use most and separate essential loads from heavy ones, so the system is planned for what you need during an outage.',
      },
      {
        question: 'How long does an installation take?',
        answer:
          'It depends on system size, access and any wiring work. We confirm the timeline in your written quote after the site assessment.',
      },
      {
        question: 'Will I receive a written quote before approving work?',
        answer:
          'Yes. We assess your site and send a written quote for you to review. Nothing is installed until you approve it.',
      },
    ],
  },
  'ikeja-gra': {
    heroTitle: 'Solar and backup power in Ikeja GRA for homes and hospitality properties',
    seo: {
      title: 'Solar & Backup Power in Ikeja GRA | AFEEZTECHSOLAR',
      description:
        'Solar and backup power for Ikeja GRA homes, offices and hospitality properties, planned around residents, staff and guests. Request a free inspection.',
      keyword: 'solar backup power Ikeja GRA',
    },
    aboutTitle: 'Backup planned around residents, staff and guests.',
    aboutParagraphs: [
      'Ikeja GRA properties include family homes, offices and hospitality spaces. Each has different hours of use and different people who depend on the power, so we begin with when backup is needed and who is affected.',
      'We inspect existing wiring and any inverter equipment you already have, then plan the installation around residents, staff or guests, so daily operations are disrupted as little as possible.',
    ],
    accessNote:
      'Tell us the property type, the hours you need backup, and when installation would suit residents or guests.',
    assessmentNote:
      'We inspect existing wiring and inverter equipment, review daytime and night-time use, and agree on the work schedule.',
    featuredServiceIds: ['0', '1', '2', '3', '6'],
    nearby: ['magodo-phase-2'],
    reviewLocations: ['Ikeja, Lagos'],
    faqs: [
      {
        question: 'Do you accept enquiries for Ikeja GRA?',
        answer:
          'Yes. Send your address, property type and what you need to power. We confirm access and availability before arranging a visit.',
      },
      {
        question: 'Can you plan around guests or staff at a hospitality property?',
        answer:
          'Yes. We agree on visit times and the work schedule, so installation is coordinated around your daily operations.',
      },
      {
        question: 'Will you check my current inverter?',
        answer:
          'Yes. We inspect existing inverter equipment and wiring, then advise whether to keep, upgrade or replace it.',
      },
      {
        question: 'How long does an installation take?',
        answer:
          'It depends on system size, access and any wiring work. We confirm the timeline in your written quote.',
      },
      {
        question: 'Will I get a written quote first?',
        answer:
          'Yes. We assess your site and send a written quote for you to review. Nothing is installed until you approve it.',
      },
    ],
  },
  'magodo-phase-2': {
    heroTitle: 'Solar and inverter power for Magodo Phase 2 family homes',
    seo: {
      title: 'Solar & Inverter Power in Magodo Phase 2 | AFEEZTECHSOLAR',
      description:
        'Solar and inverter power for Magodo Phase 2 family homes, planned around daily routines and roof suitability. Request a free site inspection.',
      keyword: 'solar inverter power Magodo Phase 2',
    },
    aboutTitle: 'Family-friendly backup, planned around daily routines.',
    aboutParagraphs: [
      'In Magodo Phase 2, backup power matters most for the rooms and appliances a family uses every day. We start with household routines, from lighting and refrigeration to water pumping, and agree on the hours you want covered.',
      'Confirming estate access, roof suitability and space for equipment comes before any recommendation. You receive a clear explanation and a written quote, so you can decide at your own pace.',
    ],
    accessNote: 'Share your estate access details and a convenient time for the assessment.',
    assessmentNote:
      'We check roof suitability, space for the proposed equipment, and the appliances on your backup circuits.',
    featuredServiceIds: ['0', '2', '3', '4'],
    nearby: ['ikeja-gra'],
    reviewLocations: ['Magodo, Lagos'],
    faqs: [
      {
        question: 'Do you cover Magodo Phase 2?',
        answer:
          'We take enquiries for Magodo Phase 2. We confirm estate access and availability before arranging a site visit.',
      },
      {
        question: 'Will you check if my roof is suitable?',
        answer:
          'Yes. Roof condition, shading and the space for equipment are checked during the site assessment, before we recommend a system.',
      },
      {
        question: 'Can the system run our refrigerator and lights?',
        answer:
          'Those are common backup priorities. We size the system after reviewing the appliance ratings and the backup hours you need, so you know what it will cover.',
      },
      {
        question: 'How long does an installation take?',
        answer:
          'It depends on system size, roof access and any wiring work. We confirm the timeline in your written quote.',
      },
      {
        question: 'Will I get a written quote first?',
        answer:
          'Yes. We assess your site and send a written quote to review. Nothing is installed until you approve it.',
      },
    ],
  },
};
