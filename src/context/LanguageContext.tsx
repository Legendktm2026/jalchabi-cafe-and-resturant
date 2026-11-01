import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'bn' | 'en';

interface Translations {
  // Navigation
  nav: {
    experience3d: string;
    founderStory: string;
    concept: string;
    menu: string;
    promotions: string;
    reviews: string;
    gallery: string;
    visit: string;
    reservations: string;
    bookTable: string;
    orderNow: string;
    cart: string;
    soundOn: string;
    soundOff: string;
  };
  // Hero & Sanctuary
  hero: {
    badge: string;
    title: string;
    bengaliTitle: string;
    subtitle: string;
    enterSanctuary: string;
    watchFilm: string;
    locationBadge: string;
    phoneBadge: string;
  };
  // 3D Characters Interactive Speech
  characters: {
    sabirGreeting: string;
    sabirSub: string;
    sabirAction: string;
    chefGreeting: string;
    chefSub: string;
    chefAction: string;
  };
  // Founder Story
  founder: {
    badge: string;
    title: string;
    bengaliSubtitle: string;
    quote: string;
    quoteAuthor: string;
    quoteRole: string;
    storyP1: string;
    storyP2: string;
    storyP3: string;
    storyP4: string;
    milestone1Title: string;
    milestone1Desc: string;
    milestone2Title: string;
    milestone2Desc: string;
    milestone3Title: string;
    milestone3Desc: string;
    milestone4Title: string;
    milestone4Desc: string;
    leadershipTitle: string;
    founderRole: string;
    founderName: string;
    founderBio: string;
    devRole: string;
    devName: string;
    devBio: string;
  };
  // Menu
  menu: {
    badge: string;
    title: string;
    bengaliTitle: string;
    subtitle: string;
    notice: string;
    viewDetails: string;
    reserveDish: string;
    addToCart: string;
    addedToCart: string;
    close: string;
  };
  // Real-time Ordering & Cart
  ordering: {
    cartTitle: string;
    emptyCart: string;
    emptyCartSub: string;
    orderMode: string;
    dineIn: string;
    takeaway: string;
    tableNumberLabel: string;
    tableSelectPlaceholder: string;
    nameLabel: string;
    phoneLabel: string;
    addressLabel: string;
    addressPlaceholder: string;
    subtotal: string;
    packaging: string;
    total: string;
    payUpiTitle: string;
    payUpiSub: string;
    scanQrNotice: string;
    openUpiApp: string;
    sendWhatsappOrder: string;
    orderPlacedSuccess: string;
    orderPlacedSub: string;
    checkoutNow: string;
    clearCart: string;
  };
  // Promotions & Weekend Specials
  promotions: {
    badge: string;
    title: string;
    subtitle: string;
    weekendTimerLabel: string;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
    saveBadge: string;
    itemsIncludedLabel: string;
    addComboToCart: string;
    offerValidNotice: string;
  };
  // Customer Reviews
  reviews: {
    badge: string;
    title: string;
    subtitle: string;
    overallRating: string;
    ratingCount: string;
    writeReviewBtn: string;
    leaveReviewTitle: string;
    leaveReviewSub: string;
    namePlaceholder: string;
    locationPlaceholder: string;
    dishPlaceholder: string;
    commentPlaceholder: string;
    submitReviewBtn: string;
    reviewSuccessMsg: string;
    verifiedDinerBadge: string;
    favoriteLabel: string;
  };
  // Visit & Location
  visit: {
    badge: string;
    title: string;
    subtitle: string;
    addressLabel: string;
    addressVal: string;
    hoursLabel: string;
    hoursVal: string;
    phoneLabel: string;
    phoneVal: string;
    landmarkLabel: string;
    landmarkVal: string;
  };
  // Reservations
  reservation: {
    badge: string;
    title: string;
    subtitle: string;
    nameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    guestsLabel: string;
    dateLabel: string;
    timeLabel: string;
    seatingLabel: string;
    notesLabel: string;
    submitBtn: string;
    submitting: string;
  };
  // Footer
  footer: {
    tagline: string;
    founderCredit: string;
    devCredit: string;
    phoneCredit: string;
    rights: string;
    locationNote: string;
  };
}

const TRANSLATIONS: Record<Language, Translations> = {
  bn: {
    nav: {
      experience3d: '৩ডি অভিজ্ঞতা',
      founderStory: 'প্রতিষ্ঠাতার গল্প',
      concept: 'আমাদের দর্শন',
      menu: 'মেনু তালিকা',
      promotions: 'উইকএন্ড অফার',
      reviews: 'গ্রাহকদের মতামত',
      gallery: 'চিত্রশালা',
      visit: 'ঠিকানা ও যোগাযোগ',
      reservations: 'টেবিল বুকিং',
      bookTable: 'বুকিং করুন',
      orderNow: 'অনলাইনে অর্ডার',
      cart: 'অর্ডার কার্ট',
      soundOn: 'শব্দ চালু',
      soundOff: 'শব্দ বন্ধ',
    },
    hero: {
      badge: 'সারবেড়িয়া • ক্যানিং ২ • দক্ষিণ ২৪ পরগণা',
      title: 'জলছবি ক্যাফে ও রেস্তোরাঁ',
      bengaliTitle: 'হৃদয়ের স্পর্শে তৈরি গ্রামীণ মরূদ্যান',
      subtitle: 'সারবেড়িয়ার বুকে এক অনন্য নান্দনিক আশ্রয়—যেখানে ভালোবাসা, সংগ্রাম ও আন্তরিক আতিথেয়তা এক বিন্দুতে মিলিত হয়।',
      enterSanctuary: 'ক্যাফেতে প্রবেশ করুন',
      watchFilm: 'চলচ্চিত্র দেখুন',
      locationBadge: 'সারবেড়িয়া, আঠারোবাঁকি, ক্যানিং ২ (পিন: ৭৪৩৩২৯)',
      phoneBadge: 'হেল্পলাইন: +৯১ ৮৯১৮৯৪৮৭৩০',
    },
    characters: {
      sabirGreeting: 'নমস্কার! আমি সাবির হোসেন খান। জলছবিতে আপনাকে স্বাগতম!',
      sabirSub: 'আমাদের গ্রামীণ ক্যাফেতে আসুন, পরিবেশ উপভোগ করুন অথবা সরাসরি অনলাইনে অর্ডার করুন।',
      sabirAction: 'অনলাইন মেনু দেখুন',
      chefGreeting: 'তাজা ও গরম রান্না হচ্ছে! খাঁটি মোমো আর বিরিয়ানি তৈরি হচ্ছে।',
      chefSub: 'অর্ডার অনুযায়ী তাৎক্ষণিক প্রস্তুত করা হচ্ছে আমাদের সিগনেচার ডিশসমূহ।',
      chefAction: 'রান্নাঘরের পদসমূহ দেখুন',
    },
    founder: {
      badge: 'স্বপ্নের সংগ্রাম ও প্রত্যাবর্তন',
      title: 'একটি অদম্য স্বপ্ন ও মাটির টান',
      bengaliSubtitle: 'প্রতিষ্ঠাতা সাবির হোসেন খানের অক্লান্ত পরিশ্রম ও ঘুরে দাঁড়ানোর গল্প',
      quote: 'বিলাসিতা কেবল শহরের আকাশচুম্বী ভবনের একচ্ছত্র অধিকার হতে পারে না। আমাদের সারবেড়িয়া ও ক্যানিং ২-এর প্রতিটি মানুষ বিশ্বমানের পরিবেশ ও আন্তরিক আতিথেয়তার যোগ্য।',
      quoteAuthor: 'সাবির হোসেন খান',
      quoteRole: 'প্রতিষ্ঠাতা ও সিইও (Founder & CEO), জলছবি',
      storyP1: 'সাবির হোসেন খানের মনে বহু বছর ধরে একটি স্বপ্ন লালিত হচ্ছিল—নিজের জন্মভূমি সারবেড়িয়াতে এমন একটি সুন্দর, আন্তর্জাতিক মানের ক্যাফে গড়ে তোলা যেখানে মানুষ শান্তিতে বসে পরিবার ও বন্ধুদের সাথে ভালো সময় কাটাতে পারবে।',
      storyP2: 'কিন্তু পথটি সহজ ছিল না। পারিবারিক অভাব-অনটন, একের পর এক অপ্রত্যাশিত বাধা ও আর্থিক টানাপোড়েন বারবার তাঁর এই স্বপ্নকে থামিয়ে দেওয়ার চেষ্টা করেছে। সমাজের অনেকেই ভেবেছিলেন এই প্রত্যন্ত অঞ্চলে এমন ক্যাফে হয়তো কখনোই সফল হবে না।',
      storyP3: 'কিন্তু সাবির হার মানেননি। বছরের পর বছর অক্লান্ত পরিশ্রম করে, নিজের ঘাম ঝরানো প্রতিটি পয়সা সঞ্চয় করে অবশেষে নিজের পৈতৃক জমিতেই জলছবির ভিত্তি স্থাপন করেন। শহরের মোহে না গিয়ে নিজের মাটিকে সমৃদ্ধ করাই ছিল তাঁর আজীবনের পণ।',
      storyP4: 'আজ জলছবি শুধুমাত্র একটি খাবারের ঠিকানা নয়—এটি সারবেড়িয়া ও সুন্দরবনের প্রবেশদ্বারে দাঁড়িয়ে থাকা এক জীবন্ত অনুপ্রেরণা, যা প্রমাণ করে সততা ও সংকল্প থাকলে যেকোনো প্রান্তেই রূপকথা তৈরি করা যায়।',
      milestone1Title: 'স্বপ্নের বীজ রোপণ',
      milestone1Desc: 'নিজের গ্রামে শহরের সমমানের এক আধুনিক ক্যাফে উপহার দেওয়ার বহু বছরের লালিত বাসনা।',
      milestone2Title: 'প্রতিকূলতার সাথে লড়াই',
      milestone2Desc: 'পারিবারিক আর্থিক সংকট ও নানান সীমাবদ্ধতার মধ্যেও আশা বাঁচিয়ে রাখার নিরন্তর সংগ্রাম।',
      milestone3Title: 'নিজের জমিতে নিজস্ব নির্মাণ',
      milestone3Desc: 'কঠোর পরিশ্রমের সঞ্চিত অর্থে সারবেড়িয়ার পৈতৃক ভূমিতে নিজ হাতে তিলে তিলে ক্যাফে রূপদান।',
      milestone4Title: 'গ্রামের গর্ব—জলছবি',
      milestone4Desc: 'সুস্বাদু মোমো, ড্রামস অফ হেভেন, ফিশ ফ্রাই ও আড্ডার সুরে মানুষের হৃদয় জয় করা।',
      leadershipTitle: 'নেতৃত্ব ও ডিজিটাল রূপকার',
      founderRole: 'প্রতিষ্ঠাতা ও প্রধান নির্বাহী কর্মকর্তা (CEO)',
      founderName: 'সাবির হোসেন খান',
      founderBio: 'দৃষ্টিভঙ্গী, স্বপ্ন ও অক্লান্ত সংগ্রামের মাধ্যমে জলছবি ক্যাফেকে বাস্তবের রূপ দিয়েছেন। ফোন: +৯১ ৮৯১৮৯৪৮৭৩০।',
      devRole: 'ওয়েবসাইট আর্কিটেক্ট ও লিড ডেভেলপার',
      devName: 'রিজওয়ান খান',
      devBio: 'আন্তর্জাতিক মানের আধুনিক থ্রিডি ওয়েব প্রযুক্তি ও মননশীল ডিজাইনে জলছবির ডিজিটাল পরিচয় নির্মাণ করেছেন।',
    },
    menu: {
      badge: 'জনপ্রিয় ক্যাফে স্পেশাল',
      title: 'স্বাদে ও আনন্দে জলছবির মেনু',
      bengaliTitle: 'তাজা ও খাঁটি উপাদানে তৈরি প্রতিদিনের আনন্দ',
      subtitle: 'দার্জিলিং মোমো, ক্রিস্পি ড্রামস অফ হেভেন, খাঁটি ভেটকি ফিশ ফ্রাই, চিকেন হাক্কা চাউমিন, মোঘলাই পরোটা ও শাহি দম বিরিয়ানি।',
      notice: 'সকল পদ সম্পূর্ণ স্বাস্থ্যসম্মত ও নিজস্ব রেসিপিতে অর্ডার অনুযায়ী প্রস্তুত করা হয়।',
      viewDetails: 'বিস্তারিত ও ফটো দেখুন',
      reserveDish: 'এই পদের জন্য টেবিল বুক করুন',
      addToCart: 'কার্টে যোগ করুন',
      addedToCart: 'যোগ করা হয়েছে',
      close: 'বন্ধ করুন',
    },
    ordering: {
      cartTitle: 'আপনার অর্ডার কার্ট',
      emptyCart: 'আপনার কার্ট বর্তমানে খালি আছে',
      emptyCartSub: 'মেনু তালিকা থেকে আপনার পছন্দের পদ যোগ করে অনলাইনে অর্ডার করুন।',
      orderMode: 'অর্ডারের ধরণ নির্বাচন করুন',
      dineIn: 'ক্যাফেতে বসে খাবেন (টেবিল নম্বর)',
      takeaway: 'হোম ডেলিভারি / পার্সেল (সারবেড়িয়া ও ক্যানিং ২)',
      tableNumberLabel: 'টেবিল নম্বর নির্বাচন করুন',
      tableSelectPlaceholder: 'টেবিল নম্বর নির্বাচন করুন (১ - ১২)',
      nameLabel: 'আপনার নাম *',
      phoneLabel: 'মোবাইল নম্বর *',
      addressLabel: 'ডেলিভারি ঠিকানা (সারবেড়িয়া ও পার্শ্ববর্তী এলাকা) *',
      addressPlaceholder: 'বাড়ি/গ্রাম/ল্যান্ডমার্ক বিস্তারিত লিখুন...',
      subtotal: 'মোট খাবার মূল্য',
      packaging: 'প্যাকেজিং ও পরিষেবা',
      total: 'সর্বমোট প্রদেয় অর্থ',
      payUpiTitle: 'PhonePe / GPay / Paytm UPI QR কোড স্ক্যান করুন',
      payUpiSub: 'সরাসরি ৮৯১৮৯৪৮৭৩০@upi-তে যেকোনো ইউপিআই অ্যাপ দিয়ে নিরাপদ পেমেন্ট করুন।',
      scanQrNotice: 'পেমেন্ট সম্পন্ন করে নিচের বোতাম চেপে হোয়াটসঅ্যাপে অর্ডার কনফার্ম করুন।',
      openUpiApp: 'UPI অ্যাপে সরাসরি পেমেন্ট করুন',
      sendWhatsappOrder: 'হোয়াটসঅ্যাপে অর্ডার নিশ্চিত করুন',
      orderPlacedSuccess: 'অর্ডার সফলভাবে প্রেরিত হয়েছে!',
      orderPlacedSub: 'সাবির হোসেন খানের কাছে হোয়াটসঅ্যাপে সরাসরি অর্ডারের বিবরণ চলে গেছে। দ্রুত প্রস্তুত করা হচ্ছে।',
      checkoutNow: 'এখনই অর্ডার ও পেমেন্ট করুন',
      clearCart: 'কার্ট খালি করুন',
    },
    promotions: {
      badge: 'উইকএন্ড ধামাকা অফার ও কম্বো',
      title: 'বিশেষ উইকএন্ড ফ্যামিলি কম্বো',
      subtitle: 'পরিবার ও বন্ধুদের সাথে আড্ডার জন্য জলছবির সবচেয়ে সাশ্রয়ী অফার। সীমিত সময়ের সুযোগ!',
      weekendTimerLabel: 'উইকএন্ড অফার শেষ হতে বাকি:',
      days: 'দিন',
      hours: 'ঘণ্টা',
      minutes: 'মিনিট',
      seconds: 'সেকেন্ড',
      saveBadge: 'টাকা সাশ্রয়',
      itemsIncludedLabel: 'কম্বোতে যা যা থাকছে:',
      addComboToCart: 'কম্বোটি কার্টে যোগ করুন',
      offerValidNotice: '*অফারটি শনিবার ও রবিবার ক্যাফে ডাইন-ইন ও হোম ডেলিভারিতে প্রযোজ্য।',
    },
    reviews: {
      badge: 'গ্রাহকদের খাঁটি অভিজ্ঞতা',
      title: 'অতিথিদের ভালোবাসা ও বিশ্বাস',
      subtitle: 'সারবেড়িয়া, ক্যানিং ও দূর-দূরান্ত থেকে আসা শত শত অতিথিদের আন্তরিক প্রতিক্রিয়া।',
      overallRating: '৪.৯ / ৫.০',
      ratingCount: '১৮০+ স্থানীয় ও কলকাতা ভ্রমণকারী গ্রাহকের মতামত',
      writeReviewBtn: 'আপনার মতামত লিখুন',
      leaveReviewTitle: 'জলছবি ক্যাফে সম্পর্কে আপনার অভিজ্ঞতা জানান',
      leaveReviewSub: 'আপনার মূল্যবান মতামত সাবির দা ও জলছবি পরিবারকে আরও এগিয়ে যেতে সাহায্য করবে।',
      namePlaceholder: 'আপনার পূর্ণ নাম',
      locationPlaceholder: 'আপনার এলাকা (যেমন: সারবেড়িয়া, আঠারোবাঁকি, কলকাতা)',
      dishPlaceholder: 'আপনার সবচেয়ে পছন্দের খাবারটি কি ছিল?',
      commentPlaceholder: 'আপনার অভিজ্ঞতা সংক্ষেপে লিখুন...',
      submitReviewBtn: 'রিভিউ জমা দিন',
      reviewSuccessMsg: 'ধন্যবাদ! আপনার রিভিউ সফলভাবে যুক্ত হয়েছে।',
      verifiedDinerBadge: 'যাচাইকৃত স্থানীয় অতিথি',
      favoriteLabel: 'প্রিয় পদ:',
    },
    visit: {
      badge: 'ঠিকানা ও রুট ম্যাপ',
      title: 'আমাদের ক্যাফেতে আসুন',
      subtitle: 'সুন্দরবনের প্রবেশদ্বার ক্যানিং ২-এর শান্ত মনোরম গ্রামীণ পরিবেশে আপনার অপেক্ষায় জলছবি।',
      addressLabel: 'সঠিক ঠিকানা',
      addressVal: 'সারবেড়িয়া প্রধান সড়ক, আঠারোবাঁকি গ্রাম পঞ্চায়েত, ক্যানিং ২ ব্লক, দক্ষিণ ২৪ পরগণা, পশ্চিমবঙ্গ - ৭৪৩৩২৯',
      hoursLabel: 'ক্যাফে খোলার সময়',
      hoursVal: 'সকাল ১০:০০ টা থেকে রাত ১০:০০ টা (সপ্তাহের ৭ দিন খোলা)',
      phoneLabel: 'সরাসরি ফোন ও হোয়াটসঅ্যাপ',
      phoneVal: '+৯১ ৮৯১৮৯৪৮৭৩০',
      landmarkLabel: 'নিকটবর্তী ল্যান্ডমার্ক',
      landmarkVal: 'সারবেড়িয়া বাজার নিকটবর্তী আঠারোবাঁকি মোড়, ক্যানিং ২',
    },
    reservation: {
      badge: 'টেবিল বুকিং ও পরামর্শ',
      title: 'আপনার আসনটি নিশ্চিত করুন',
      subtitle: 'পারিবারিক অনুষ্ঠান, বন্ধুদের আড্ডা বা জন্মদিনের বিশেষ মুহূর্ত উদযাপনের জন্য অগ্রিম বুকিং করুন।',
      nameLabel: 'আপনার পূর্ণ নাম *',
      emailLabel: 'ইমেইল ঠিকানা *',
      phoneLabel: 'মোবাইল নম্বর *',
      guestsLabel: 'অতিথির সংখ্যা',
      dateLabel: 'তারিখ',
      timeLabel: 'পছন্দের সময়',
      seatingLabel: 'বসার পরিবেশের পছন্দ',
      notesLabel: 'বিশেষ কোনো অনুরোধ বা খাবারের নির্দেশনা',
      submitBtn: 'টেবিল বুকিং অনুরোধ পাঠান',
      submitting: 'বুকিং প্রক্রিয়াধীন...',
    },
    footer: {
      tagline: 'গ্রামীণ ভালোবাসায় গড়া বিশ্বমানের ক্যাফে ও রেস্তোরাঁ অভিজ্ঞতা।',
      founderCredit: 'প্রতিষ্ঠাতা ও সিইও: সাবির হোসেন খান',
      devCredit: 'ওয়েবসাইট আর্কিটেক্ট ও বিকাশ: রিজওয়ান খান',
      phoneCredit: 'ফোন / হোয়াটসঅ্যাপ: +৯১ ৮৯১৮৯৪৮৭৩০',
      rights: 'সর্বস্বত্ব সংরক্ষিত।',
      locationNote: 'সারবেড়িয়া, আঠারোবাঁকি, ক্যানিং ২, পিন: ৭৪৩৩২৯',
    },
  },
  en: {
    nav: {
      experience3d: '3D Experience',
      founderStory: 'Founder Story',
      concept: 'The Concept',
      menu: 'Menu',
      promotions: 'Weekend Offers',
      reviews: 'Reviews',
      gallery: 'Gallery',
      visit: 'Visit & Hours',
      reservations: 'Table Booking',
      bookTable: 'Book Table',
      orderNow: 'Order Online',
      cart: 'Order Cart',
      soundOn: 'Sound On',
      soundOff: 'Sound Off',
    },
    hero: {
      badge: 'Sarberia • Canning II • South 24 Parganas',
      title: 'Jalchabi Cafe & Restaurant',
      bengaliTitle: 'A Rural Oasis Built with Heart',
      subtitle: 'A sanctuary on the rural soil of Sarberia—where lifelong dreams, perseverance, and heartfelt hospitality meet.',
      enterSanctuary: 'Enter Jalchabi Sanctuary',
      watchFilm: 'Watch Atmosphere Film',
      locationBadge: 'Sarberia, Atharobanki, Canning II (PIN: 743329)',
      phoneBadge: 'Direct Helpline: +91 8918948730',
    },
    characters: {
      sabirGreeting: 'Namaskar! I am Sabir Hossen Khan. Welcome to Jalchabi!',
      sabirSub: 'Experience our rural sanctuary in Sarberia, take the 3D tour, or order real-time right to your table or doorstep!',
      sabirAction: 'Explore Online Menu',
      chefGreeting: 'Fresh Cooking in Progress! Steamed Momos & Royal Biryani are ready!',
      chefSub: 'Prepared hot to order by our kitchen artisans with fresh authentic spices.',
      chefAction: 'View Kitchen Specials',
    },
    founder: {
      badge: 'Dreams, Struggles & Resilience',
      title: 'A Dream Born from Struggle',
      bengaliSubtitle: 'The Inspiring Journey of Founder & CEO Sabir Hossen Khan',
      quote: "Luxury and world-class warmth shouldn't belong only to big city towers. The people of Sarberia and Canning deserve the very best environment, finest coffee, and heartfelt hospitality right in their own home.",
      quoteAuthor: 'Sabir Hossen Khan',
      quoteRole: 'Founder & CEO, Jalchabi Cafe & Restaurant',
      storyP1: 'For years, Sabir Hossen Khan carried a vibrant dream in his heart: to build a beautiful, high-quality cafe sanctuary right in his native rural homeland of Sarberia, where local families and youth could gather with pride.',
      storyP2: 'The journey was fraught with hardship. Difficult family circumstances, financial setbacks, and relentless hurdles repeatedly delayed his plans. To many around him, building a high-end luxury cafe in rural Canning seemed impossible.',
      storyP3: 'Sabir never surrendered. Working tirelessly over years, saving his hard-earned money penny by penny, he chose to invest everything into his own ancestral land in Sarberia. Instead of leaving for the metro cities, he committed to lifting his own community.',
      storyP4: 'Today, Jalchabi stands not merely as an eatery, but as an enduring beacon of hope at the gateway to the Sundarbans—a testament to what relentless faith and honest sweat can build.',
      milestone1Title: 'The Spark & Dream',
      milestone1Desc: 'Nurturing the quiet ambition to bring a city-grade cafe sanctuary to his rural native village.',
      milestone2Title: 'Years of Struggle',
      milestone2Desc: 'Surviving family crises, financial limitations, and skepticism without ever abandoning the vision.',
      milestone3Title: 'Ancestral Land Transformation',
      milestone3Desc: 'Pouring hard-earned personal savings to construct Jalchabi brick by brick on his own Sarberia soil.',
      milestone4Title: 'A Rural Oasis of Dignity',
      milestone4Desc: 'Winning hearts across Canning II with fresh Darjeeling Momos, crispy chicken, and warm hospitality.',
      leadershipTitle: 'Executive Leadership & Digital Architecture',
      founderRole: 'Founder & Chief Executive Officer (CEO)',
      founderName: 'Sabir Hossen Khan',
      founderBio: 'Visionary and founder who built Jalchabi from personal savings on ancestral land in Sarberia. Phone: +91 8918948730.',
      devRole: 'Website Architect & Lead Developer',
      devName: 'Rizwan Khan',
      devBio: 'Created Jalchabi’s immersive 3D WebGL engine, bilingual localization, and full-fidelity ordering system.',
    },
    menu: {
      badge: 'Handcrafted Cafe Staples',
      title: 'Culinary Delights of Jalchabi',
      bengaliTitle: 'Fresh, Honest & Delicious Food Every Day',
      subtitle: 'Darjeeling Steamed & Fried Momos, Crispy Drums of Heaven, Authentic Bhetki Fish Fry, Kolkata Chowmein, Mughlai Parathas & Royal Dum Biryani.',
      notice: 'Every dish is cooked fresh to order with pure hygiene and house-made spices.',
      viewDetails: 'View Details & Photo',
      reserveDish: 'Reserve Table for this Dish',
      addToCart: 'Add to Cart',
      addedToCart: 'Added to Cart',
      close: 'Close',
    },
    ordering: {
      cartTitle: 'Your Order Cart',
      emptyCart: 'Your cart is currently empty',
      emptyCartSub: 'Explore our menu and add your favorite dishes to place a real-time order.',
      orderMode: 'Select Order Mode',
      dineIn: 'Dine-In (Table Service)',
      takeaway: 'Takeaway / Delivery (Sarberia & Canning II)',
      tableNumberLabel: 'Select Table Number',
      tableSelectPlaceholder: 'Choose Table (Table 1 to 12)',
      nameLabel: 'Your Full Name *',
      phoneLabel: 'Mobile Phone Number *',
      addressLabel: 'Delivery Address in Sarberia / Canning II *',
      addressPlaceholder: 'Village, house details or nearby landmark...',
      subtotal: 'Dishes Subtotal',
      packaging: 'Packaging & Service',
      total: 'Grand Total Amount',
      payUpiTitle: 'Scan PhonePe / GPay / Paytm UPI QR Code',
      payUpiSub: 'Pay securely using any UPI app to 8918948730@upi.',
      scanQrNotice: 'After completing payment, click below to confirm your order via WhatsApp.',
      openUpiApp: 'Pay with UPI App Directly',
      sendWhatsappOrder: 'Confirm & Send Order via WhatsApp',
      orderPlacedSuccess: 'Order Placed Successfully!',
      orderPlacedSub: 'Your order details have been dispatched to Sabir Hossen Khan via WhatsApp. Our kitchen is preparing your meal.',
      checkoutNow: 'Checkout & Pay Now',
      clearCart: 'Clear Cart',
    },
    promotions: {
      badge: 'Weekend Specials & Combos',
      title: 'Weekend Family Combos',
      subtitle: 'The best value meals designed for family feasts and evening adda with friends. Limited time savings!',
      weekendTimerLabel: 'Weekend Offer Ends In:',
      days: 'Days',
      hours: 'Hours',
      minutes: 'Mins',
      seconds: 'Secs',
      saveBadge: 'Savings',
      itemsIncludedLabel: 'Items Included:',
      addComboToCart: 'Add Combo to Order Cart',
      offerValidNotice: '*Available on Saturdays and Sundays for Dine-in and Local Sarberia Delivery.',
    },
    reviews: {
      badge: 'Community Trust & Social Proof',
      title: 'Loved by Our Guests',
      subtitle: 'Genuine reviews from families in Sarberia, Canning II, and travelers visiting from Kolkata.',
      overallRating: '4.9 / 5.0',
      ratingCount: 'Based on 180+ verified Google & local guest reviews',
      writeReviewBtn: 'Write a Review',
      leaveReviewTitle: 'Share Your Experience at Jalchabi',
      leaveReviewSub: 'Your feedback inspires Founder Sabir Hossen Khan and our kitchen artisans.',
      namePlaceholder: 'Your Name',
      locationPlaceholder: 'Your Location (e.g. Sarberia, Canning, Kolkata)',
      dishPlaceholder: 'What was your favorite dish?',
      commentPlaceholder: 'Share your dining experience with us...',
      submitReviewBtn: 'Submit Review',
      reviewSuccessMsg: 'Thank you! Your review has been submitted successfully.',
      verifiedDinerBadge: 'Verified Local Guest',
      favoriteLabel: 'Favorite:',
    },
    visit: {
      badge: 'Sanctuary Geography & Access',
      title: 'Find Your Way to Jalchabi',
      subtitle: 'A serene waterside retreat awaiting you in the peaceful rural landscape of Canning II.',
      addressLabel: 'Exact Physical Location',
      addressVal: 'Sarberia Main Road, Atharobanki Gram Panchayat, Canning II Block, South 24 Parganas, West Bengal - 743329',
      hoursLabel: 'Hours of Hospitality',
      hoursVal: '10:00 AM – 10:00 PM Daily (Open 7 Days)',
      phoneLabel: 'Direct Calling & WhatsApp',
      phoneVal: '+91 8918948730',
      landmarkLabel: 'Key Landmark',
      landmarkVal: 'Near Atharobanki Crossing, Sarberia, Canning II',
    },
    reservation: {
      badge: 'Table Booking & Concierge',
      title: 'Reserve Your Sanctuary Seat',
      subtitle: 'Book ahead for family celebrations, romantic dates, or weekend banquets overlooking the water.',
      nameLabel: 'Your Full Name *',
      emailLabel: 'Email Address *',
      phoneLabel: 'Phone Number *',
      guestsLabel: 'Number of Guests',
      dateLabel: 'Date',
      timeLabel: 'Preferred Time',
      seatingLabel: 'Seating Atmosphere Preference',
      notesLabel: 'Special Occasions or Dietary Notes',
      submitBtn: 'Request Table Reservation',
      submitting: 'Processing Reservation...',
    },
    footer: {
      tagline: 'A rural oasis built with heart, serving Canning II with world-class hospitality.',
      founderCredit: 'Founder & CEO: Sabir Hossen Khan',
      devCredit: 'Website Architect & Lead Developer: Rizwan Khan',
      phoneCredit: 'Phone / WhatsApp: +91 8918948730',
      rights: 'All rights reserved.',
      locationNote: 'Sarberia, Atharobanki, Canning II - 743329',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to Bengali ('bn') as per client specifications
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('jalchabi_lang');
    return (saved === 'en' || saved === 'bn') ? saved : 'bn';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('jalchabi_lang', lang);
    document.documentElement.lang = lang;
  };

  const toggleLanguage = () => {
    setLanguage(language === 'bn' ? 'en' : 'bn');
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t: TRANSLATIONS[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
