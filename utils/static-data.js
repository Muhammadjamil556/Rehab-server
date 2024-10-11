const medicinesData = [
  {
    id: 1,
    name: "Avastin 400mg Injection",
    composition: "Bevacizumab (400mg)",
    uses: "Cancer of colon and rectum, Non-small cell lung cancer, Kidney cancer, Brain tumor, Ovarian cancer, Cervical cancer",
    sideEffects:
      "Rectal bleeding, Taste change, Headache, Nosebleeds, Back pain, Dry skin, High blood pressure, Protein in urine, Inflammation of the nose",
    imageURL:
      "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/f5a26c491e4d48199ab116a69a969be3.jpg",
    manufacturer: "Roche Products India Pvt Ltd",
  },
  {
    id: 2,
    name: "Augmentin 625 Duo Tablet",
    composition: "Amoxycillin  (500mg) +  Clavulanic Acid (125mg)",
    uses: "Treatment of Bacterial infections",
    sideEffects: "Vomiting, Nausea, Diarrhea, Mucocutaneous candidiasis",
    imageURL:
      "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/wy2y9bdipmh6rgkrj0zm.jpg",
    manufacturer: "Glaxo SmithKline Pharmaceuticals Ltd",
  },
  {
    id: 3,
    name: "Azithral 500 Tablet",
    composition: "Azithromycin (500mg)",
    uses: "Treatment of Bacterial infections",
    sideEffects: "Nausea, Abdominal pain, Diarrhea",
    imageURL:
      "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/kqkouvaqejbyk47dvjfu.jpg",
    manufacturer: "Alembic Pharmaceuticals Ltd",
  },
  {
    id: 4,
    name: "Ascoril LS Syrup",
    composition:
      "Ambroxol (30mg/5ml) + Levosalbutamol (1mg/5ml) + Guaifenesin (50mg/5ml)",
    uses: "Treatment of Cough with mucus",
    sideEffects:
      "Nausea, Vomiting, Diarrhea, Upset stomach, Stomach pain, Allergic reaction, Dizziness, Headache, Rash, Hives, Tremors, Palpitations, Muscle cramp, Increased heart rate",
    imageURL:
      "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/3205599cc49d4073ae66cbb0dbfded86.jpg",
    manufacturer: "Glenmark Pharmaceuticals Ltd",
  },
  {
    id: 5,
    name: "Aciloc 150 Tablet",
    composition: "Ranitidine (150mg)",
    uses: "Treatment of Gastroesophageal reflux disease (Acid reflux), Treatment of Peptic ulcer disease",
    sideEffects: "Headache, Diarrhea, Gastrointestinal disturbance",
    imageURL:
      "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/pn7apngctvrtweencwi1.jpg",
    manufacturer: "Cadila Pharmaceuticals Ltd",
  },
  {
    id: 6,
    name: "Allegra 120mg Tablet",
    composition: "Fexofenadine (120mg)",
    uses: "Treatment of Sneezing and runny nose due to allergies, Treatment of Allergic conditions",
    sideEffects: "Headache, Drowsiness, Dizziness, Nausea",
    imageURL:
      "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/fa7427131ec64163b5bbafb529df0736.jpg",
    manufacturer: "Sanofi India Ltd",
  },
  {
    id: 7,
    name: "Avil 25 Tablet",
    composition: "Pheniramine (25mg)",
    uses: "Treatment of Allergic conditions, Treatment of Respiratory disease with excessive mucus, Treatment of Skin conditions with inflammation & itching, Treatment and prevention of Meniere's disease",
    sideEffects: "Sedation",
    imageURL:
      "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/mmsye6bf97tkcocat24j.jpg",
    manufacturer: "Sanofi India Ltd",
  },
  {
    id: 8,
    name: "Aricep 5 Tablet",
    composition: "Donepezil (5mg)",
    uses: "Alzheimer's disease, Common cold, Urinary incontinence",
    sideEffects:
      "Rash, Nausea, Diarrhea, Insomnia difficulty in sleeping, Weight loss, Accidental injury",
    imageURL:
      "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/d7ojjdaw2gsm5sie1glu.jpg",
    manufacturer: "Eisai Pharmaceuticals India Pvt Ltd",
  },
  {
    id: 9,
    name: "Amoxyclav 625 Tablet",
    composition: "Amoxycillin  (500mg) +  Clavulanic Acid (125mg)",
    uses: "Treatment of Bacterial infections",
    sideEffects: "Vomiting, Nausea, Diarrhea, Mucocutaneous candidiasis",
    imageURL:
      "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/acaa6608e016456f9cafcca2156ad3de.jpg",
    manufacturer: "Abbott",
  },
  // Continue adding other medicines...
  {
    id: 21,
    name: "Betacap TR 40 Capsule",
    composition: "Propranolol (40mg)",
    uses: "Treatment of Pheochromocytoma, Treatment of Hypertension (high blood pressure), Prevention of migraine, Treatment of Anxiety, Treatment of Arrhythmia, Prevention of Heart attack, Prevention of Angina (heart-related chest pain), Treatment of Tremors",
    sideEffects:
      "Tiredness, Weakness, Raynaud's phenomenon, Arrhythmia (irregular heartbeats), Nausea, Vomiting, Diarrhea",
    imageURL:
      "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/gbo9tlhcy1vsyn0gah0m.jpg",
    manufacturer: "Sun Pharmaceutical Industries Ltd",
  },
  {
    id: 22,
    name: "Bandy Plus Suspension",
    composition: "Albendazole (200mg) + Ivermectin (1.5mg)",
    uses: "Treatment of Parasitic worm infections",
    sideEffects:
      "Abdominal pain, Constipation, Diarrhea, Loss of appetite, Headache, Dizziness, Hair loss, Itching, Urticaria, Fatigue, Fever, Rigors",
    imageURL:
      "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/oxlsk7ifb0ucpqvhhd7t.jpg",
    manufacturer: "Mankind Pharma Ltd",
  },
  {
    id: 23,
    name: "Becadexamin Capsule",
    composition:
      "Beta-carotene (2500IU) + Biotin (30mcg) + Folic Acid (vitamin B9) (1.5mg) + Niacinamide (vitamin B3) (100mg) + Riboflavin (vitamin B2) (10mg) + Thiamine (vitamin B1) (10mg) + Vitamin B12 (15mcg) + Vitamin C (75mg) + Vitamin D3 (400IU) + Vitamin E (15IU) + Zinc (22.5mg)",
    uses: "General weakness, Nutritional deficiencies, Osteoporosis, Pregnancy",
    sideEffects: "Nausea, Vomiting, Abdominal cramp, Diarrhea",
    imageURL:
      "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/awr4rj8c8lmyudkfy6rb.jpg",
    manufacturer: "Glaxo SmithKline Pharmaceuticals Ltd",
  },
  {
    id: 24,
    name: "Bandy-Plus Tablet",
    composition: "Albendazole (400mg) + Ivermectin (6mg)",
    uses: "Treatment of Parasitic worm infections",
    sideEffects:
      "Abdominal pain, Constipation, Diarrhea, Loss of appetite, Headache, Dizziness, Hair loss, Itching, Urticaria, Fatigue, Fever, Rigors",
    imageURL:
      "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/txvld6xayhfqc7ovdkgv.jpg",
    manufacturer: "Mankind Pharma Ltd",
  },
  {
    id: 25,
    name: "Beplex Forte Capsule",
    composition:
      "Niacinamide (vitamin B3) (100mg) + Vitamin B12 (15mcg) + Vitamin B6 (Pyridoxine) (3mg) + Vitamin C (75mg)",
    uses: "Treatment of Acne, Treatment of Anemia, Wound healing, Treatment of Osteoarthritis",
    sideEffects: "Nausea, Vomiting, Abdominal cramp, Diarrhea",
    imageURL:
      "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/h9tqsgpi1gahhy6tacuf.jpg",
    manufacturer: "Mankind Pharma Ltd",
  },
  {
    id: 26,
    name: "Becosules Capsule",
    composition:
      "Beta-carotene (2500IU) + Biotin (30mcg) + Folic Acid (vitamin B9) (1.5mg) + Niacinamide (vitamin B3) (100mg) + Riboflavin (vitamin B2) (10mg) + Thiamine (vitamin B1) (10mg) + Vitamin B12 (15mcg) + Vitamin C (75mg) + Vitamin D3 (400IU) + Vitamin E (15IU) + Zinc (22.5mg)",
    uses: "Nutritional deficiencies, Pregnancy, Osteoporosis",
    sideEffects: "Nausea, Vomiting, Abdominal cramp, Diarrhea",
    imageURL:
      "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/ijujlszvqqsqdfjknyxd.jpg",
    manufacturer: "Pfizer Ltd",
  },
  {
    id: 27,
    name: "Betnesol Tablet",
    composition: "Betamethasone (500mcg)",
    uses: "Treatment of Allergic conditions, Asthma, Rheumatic disorder, Skin disorders, Eye disorders, Nephrotic syndrome, Connective tissue disorder",
    sideEffects:
      "Weight gain, Increased appetite, Mood changes, Acne, Muscle weakness, Increased blood pressure, Increased blood glucose level, Cushingoid appearance, Osteoporosis, Increased risk of infection",
    imageURL:
      "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/uilvdu5alvbxmxqme8hf.jpg",
    manufacturer: "Glaxo SmithKline Pharmaceuticals Ltd",
  },
  {
    id: 28,
    name: "Betacap 20 Tablet",
    composition: "Propranolol (20mg)",
    uses: "Prevention of Migraine, Treatment of Hypertension (high blood pressure), Prevention of Heart attack, Prevention of Angina (heart-related chest pain), Treatment of Arrhythmia, Treatment of Tremors, Treatment of Anxiety, Treatment of Pheochromocytoma",
    sideEffects:
      "Tiredness, Weakness, Raynaud's phenomenon, Arrhythmia (irregular heartbeats), Nausea, Vomiting, Diarrhea",
    imageURL:
      "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/ksekc9ojpf5x8cbrsf9i.jpg",
    manufacturer: "Sun Pharmaceutical Industries Ltd",
  },
  {
    id: 29,
    name: "Brutaflam-MR 4 Tablet",
    composition: "Etoricoxib (60mg) + Thiocolchicoside (4mg)",
    uses: "Treatment of Pain due to muscle spasm",
    sideEffects:
      "Diarrhea, Stomach pain, Indigestion, Flatulence, Swelling of hands, Feet swelling, Flu-like symptoms",
    imageURL:
      "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/qd1xcswzvcccpqflknsa.jpg",
    manufacturer: "Mankind Pharma Ltd",
  },
  {
    id: 30,
    name: "Becosules Syrup",
    composition:
      "Cyanocobalamin (vitamin B12) (5mcg) + Folic Acid (vitamin B9) (1.5mg) + Niacinamide (vitamin B3) (50mg) + Pyridoxine (vitamin B6) (1.5mg)",
    uses: "Nutritional deficiencies, Pregnancy, Osteoporosis",
    sideEffects: "Nausea, Vomiting, Abdominal cramp, Diarrhea",
    imageURL:
      "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/n5vxrlgcemxxidufm3z5.jpg",
    manufacturer: "Pfizer Ltd",
  },
];

const exerciseData = [
  {
    id: 1,
    image:
      "https://responsephysio.com/wp-content/uploads/2021/05/ankle-exercises.jpg",
    title: "ANKLE & FOOT PAIN EXERCISES",
    description:
      "View exercises to relieve injuries and conditions affecting the ankle and foot; including fractures, Achilles tendonitis, arthritis and sprains.",
  },
  {
    id: 2,
    image:
      "https://responsephysio.com/wp-content/uploads/2021/05/back-exercises.jpg",
    title: "BACK PAIN EXERCISES",
    description:
      "View exercises to relieve injuries and conditions affecting the lower back; including backache from bad posture, sciatica, torn muscles, arthritis, scoliosis, and disc problems",
  },
  {
    id: 3,
    image:
      "https://responsephysio.com/wp-content/uploads/2021/06/elbow-1-e1629198166160.jpg",
    title: "ELBOW PAIN EXERCISES",
    description:
      "View exercises to relieve injuries and conditions affecting the elbow; including golfer’s elbow, tennis elbow, overuse, bursitis, arthritis, tendonitis and trapped nerves.",
  },
  {
    id: 4,
    image:
      "https://responsephysio.com/wp-content/uploads/2021/06/hand-and-wrist-image.jpg",
    title: "HAND & WRIST PAIN EXERCISES",
    description:
      "View exercises to relieve injuries and conditions affecting the hand and wrist; including arthritis, carpal tunnel syndrome, tendonitis, de Quervain's, repetitive strain and writer's cramps.",
  },
  {
    id: 5,
    image:
      "https://responsephysio.com/wp-content/uploads/2021/06/hip-exercise.jpg",
    title: "HIP PAIN EXERCISES",
    description:
      "View exercises to relieve injuries and conditions affecting the hips; including fractures, strains, bursitis, arthritis, snapping hip, sciatica, labral tears and overuse.",
  },

  {
    id: 6,
    image:
      "https://responsephysio.com/wp-content/uploads/2021/06/knee-exercise.jpg",
    title: "KNEE PAIN EXERCISES",
    description:
      "View exercises to relieve injuries and conditions affecting the knee; including runners knee, fractures, strains, tendonitis, Osgood-Schlatters disease and arthritis.",
  },
];

const exerciseDetailByIdData = [
  {
    id: 1,
    title: "ANKLE & FOOT PAIN EXERCISES",
    subHeading:
      "Struggling with an ankle or foot injury, medical condition or nerve pain? Try these gentle stretching and strengthening exercises to help ease the pain.",
    exercisesDetails: "PHYSIOTHERAPY EXERCISES FOR FOOT AND ANKLE PAIN",
    description:
      "Looking for physio-approved gentle exercises to help hurt feet or ankles? Regularly exercising and stretching your feet and ankles can help to build up the surrounding muscles that provide support. Keeping your feet strong will alleviate your soreness, improve flexibility and reduce the likelihood of the pain returning.",
    image:
      "https://responsephysio.com/wp-content/uploads/2021/05/ankle-exercises.jpg",
    data: [
      {
        image:
          "https://responsephysio.com/wp-content/uploads/2021/05/standing-calf-stretch.jpg",
        video: "https://youtu.be/GpWSrv28Hqw",
        description:
          "Standing calf stretch - Hold a table or chair for support in a standing position and step the symptomatic leg back behind you. Keep the heels on the floor and toes pointed forwards. Bend the front knee, moving your body forwards until you feel a stretch in the back of your calf. Make sure your heel does not come off the floor and your back knee does not bend.",
      },
      {
        image:
          "https://responsephysio.com/wp-content/uploads/2021/05/balance.jpg",
        video: "https://youtu.be/y81I6jBEzgc",
        description:
          "Single leg balance - Stand on one leg keeping your big toe off the floor and maintaining your arch throughout. Hold this position",
      },
      {
        image:
          "https://responsephysio.com/wp-content/uploads/2021/05/Metatarsal-doming-image.jpg",
        video: "https://youtu.be/pfFIxv6g3s0",
        description:
          "Metatarsal doming - In sitting with your foot flat on the floor tighten the muscles through the sole of your foot. your arch should raise a little. Ensure you do not curl your toes under. Hold this position.",
      },
      {
        image:
          "https://responsephysio.com/wp-content/uploads/2021/05/Heel-raise.jpg",
        video: "https://youtu.be/CiCYXkd95qs",
        description:
          "Calf raise toes dorsiflexed - Roll up a towel and place it on the floor near a wall. Place your toes on the towel and raise your heels off the ground using the wall for balance. Hold at the top for a moment then slowly lower your heels back down to the ground.",
      },
    ],
  },
  {
    id: 2,
    title: "BACK PAIN EXERCISES",
    image:
      "https://responsephysio.com/wp-content/uploads/2021/05/back-exercises.jpg",
    subHeading:
      "Struggling with lower back pain due to an injury, medical condition or poor posture? Try these gentle stretching and strengthening exercises to help ease the pain.",
    exercisesDetails: "PHYSIOTHERAPY EXERCISES FOR LOWER BACK PAIN",
    description:
      "Looking for physio-approved gentle exercises to help lower back pain? Back pain treatment is usually most effective when it involves strengthening exercises to strengthen the core, restore mobility in the back and address any underlying imbalances or postural problems.",
    data: [
      {
        image:
          "https://responsephysio.com/wp-content/uploads/2021/05/Book-opening-thoracic-rotation.jpg",
        video: "https://youtu.be/3iMcRMFZNpo",
        description:
          "Lay on your side with your head supported and your arm outstretched in front of you. Lift your top arm up from the floor towards the ceiling and follow the movement with your head and upper body. Continue to move this arm up and over towards the floor. Lift the arm back up and slowly return it out in front of you.",
      },
      {
        image:
          "https://responsephysio.com/wp-content/uploads/2021/05/cat-pose.jpg",
        video: "https://youtu.be/UhLz5I7vzQ0",
        description:
          "Start on your hands and knees. Arch your back up towards the ceiling. Tuck your tailbone down, round your shoulders and drop your head down. Next, reverse the movement. Lift your head up. This your back and push your tailbone up towards the ceiling. Repeat the movement keeping your arms straight throughout",
      },
      {
        image:
          "https://responsephysio.com/wp-content/uploads/2021/05/pigeon-pose.jpg",
        video: "https://youtu.be/BZeS-XFAvPs",
        description:
          "Start on your hands and knees. Cross symptomatic leg underneath you. Then lower your hips down to the ground. Rest your body forwards on your arms. You should feel a stretch across the buttock.",
      },
      {
        image:
          "https://responsephysio.com/wp-content/uploads/2021/05/bridge-with-roller.jpg",
        video: "https://youtu.be/hRbo9OPcVdU",
        description:
          "Lie on your back with your knees bent and your feet flat on the floor. Take a ball of foam roller and squeeze it between your knees, maintaining the squeeze throughout the movement. lift your hips up keeping them level. Continue to squeeze as you look back to the starting position.",
      },
    ],
  },
  {
    id: 3,
    image:
      "https://responsephysio.com/wp-content/uploads/2021/06/elbow-1-e1629198166160.jpg",
    title: "ELBOW PAIN EXERCISES",

    subHeading:
      "If your elbow pain is due to an injury, surgery, or medical condition, try these gentle stretching and strengthening elbow exercises to help treat your pain.",
    exercisesDetails: "BEST EXERCISES FOR ELBOW PAIN",
    description:
      "Elbow pain caused by conditions such as tennis elbow can be relieved at home, with a combination of rest, ice and specific gentle exercises. You should also stop any repetitive activity causing the issue and rest the arm, so the inflammation can ease.Doing exercises designed for tennis elbow helps strengthen forearm muscles and improve function. These exercises are also good for helping to ease pain from arthritis, golfer’s elbow, carpal tunnel pain, bursitis, trapped nerves, fractures and sprains.",
    data: [
      {
        image:
          "https://responsephysio.com/wp-content/uploads/2021/06/Resisted-supination-image.jpg",
        video: "https://youtu.be/cJrOMnmq_U0",
        description:
          "Place the resistance band in both hands with your palms facing down. Slowly turn the palm of your affected arm over pulling against the resistance of the band. Control the pull of the band to slowly return to the start position.",
      },
      {
        image:
          "https://responsephysio.com/wp-content/uploads/2021/06/eagle-bands.jpg",
        video: "https://youtu.be/hUcfxttGN3A",
        description:
          "In standing hold a resistance band in both hands behind your body. Slowly pull the band apart whilst rotating your hand out so that your palms end up facing forwards.",
      },
      {
        image:
          "https://responsephysio.com/wp-content/uploads/2021/06/wrist-supination.jpg",
        video: "https://youtu.be/YsFNG9mbIrU",
        description:
          "Wrist supination - Grip a band between both hands with your palms facing down- slowly rotate the elbow of your affected arm out so that your palm ends up facing up",
      },
      {
        image: "https://responsephysio.com/wp-content/uploads/2021/06/ear.jpg",
        video: "https://youtu.be/TtaLBXVHVH8",
        description:
          "Bend your elbow to touch your chin, then touch your ear with your hand. Lift your arm straight up to the sky. Repeat this exercise several times.",
      },
    ],
  },
  {
    id: 4,
    image:
      "https://responsephysio.com/wp-content/uploads/2021/06/hand-and-wrist-image.jpg",
    title: "HAND & WRIST PAIN EXERCISES",

    subHeading:
      "Have you been struggling with a hand or wrist injury, medical condition, repetitive strain or nerve pain? Try these gentle stretching and strengthening exercises to help ease the pain.",
    exercisesDetails: "PHYSIOTHERAPY EXERCISES FOR WRIST AND HAND PAIN",
    description:
      "Looking for physio-approved gentle exercises to help painful wrists or hands? Regularly exercising and stretching your fingers, hands and wrists can help to build up the surrounding soft tissues that provide support. Keeping your wrists strong will alleviate your soreness, improve flexibility and reduce the likelihood of the pain returning.",
    data: [
      {
        image:
          "https://responsephysio.com/wp-content/uploads/2021/06/Pray-Stretch-website-image.jpg",
        video: "https://youtu.be/cmmDu0S3rVs",
        description:
          "Pray Stretch - Put your hands together with your fingers pointing up. Bring your elbows out and pull your hands downwards holding this stretch.",
      },
      {
        image:
          "https://responsephysio.com/wp-content/uploads/2021/05/hand-wrist-pain.jpg",
        video: "https://youtu.be/pJ2rqUgO-m4",
        description:
          "Wringing the towel- Inserting grip a small roll towel at the ends. Using your weaker wrist, twist the towel so that your wrist lifts, then slowly return to the starting position.",
      },
      {
        image:
          "https://responsephysio.com/wp-content/uploads/2021/06/reverse-wrist.jpg",
        video: "https://youtu.be/MYTK8Canrzk",
        description:
          "Reverse prayer stretch - Place the backs of your hands together, slowly bring your forearms up and push your elbows down until you feel a stretch in your forearms. Hold this position",
      },
      {
        image:
          "https://responsephysio.com/wp-content/uploads/2021/06/wrsit-pronation.jpg",
        video: "https://youtu.be/taU6rbV_ejQ",
        description:
          "Wrist pronation - Hold a rolled-up towel in both hands with your palms facing up with your affected arm slowly twist the towel so that your palm is facing down. Then return to the starting position.",
      },
    ],
  },
  {
    id: 5,
    image:
      "https://responsephysio.com/wp-content/uploads/2021/06/hip-exercise.jpg",
    title: "HIP PAIN EXERCISES",

    subHeading:
      "If you are experiencing hip pain due to an injury, surgery, after exercise, or a medical condition, try these gentle stretching and strengthening exercises to help ease the pain.",
    exercisesDetails: "PHYSIOTHERAPY EXERCISES FOR HIP PAIN",
    description:
      "Gentle exercises for knee pain are an excellent place to start to reduce knee pain. In just about every case of knee pain we see, there is substantial weakness in the surrounding muscles. Our exercises can help to build this muscle, ultimately reducing the stress on your knee and allowing your joint to move more easily.",
    data: [
      {
        image:
          "https://responsephysio.com/wp-content/uploads/2021/06/Hip-extension-website.jpg",
        video: "https://youtu.be/Xv4pKoT-6Do",
        description:
          "Hip flexor/extension - In standing hold a chair or work surface for support. Lift your leg up towards the ceiling bending at the hip and knee to 90 degrees- pause here briefly then slowly lower. Next keeping your knee straight move your leg backwards. Clench your buttock and pause here briefly then slowly lower. Next, lift your leg sideways pause here briefly then slowly lower.",
      },
      {
        image:
          "https://responsephysio.com/wp-content/uploads/2021/05/response-step-lunge.jpg",
        video: "https://youtu.be/VSE2vmTRo_A",
        description:
          "Lunge with step - In standing stand with one leg in front and the other leg on a small step behind you. Slowly bend your knees and lower your body towards the floor. Your front knee should remain over your foot and not track forwards.",
      },
      {
        image:
          "https://responsephysio.com/wp-content/uploads/2021/06/Glue-stretch.jpg",
        video: "https://youtu.be/KaBeAqRbh1E",
        description:
          "Glute stretch - In sitting place the foot of your affected leg on to the knee to the knee of your unaffected leg. With your hands gently pull your knee across your body then lean away and forwards to feel a stretch in your glute- hold this position.",
      },
    ],
  },

  {
    id: 6,
    image:
      "https://responsephysio.com/wp-content/uploads/2021/06/knee-exercise.jpg",
    title: "KNEE PAIN EXERCISES",
    subHeading:
      "If your knee pain is due to an injury, surgery, or arthritis, try these gentle stretching and strengthening exercises to help ease the pain.",
    exercisesDetails: "PHYSIOTHERAPY EXERCISES FOR KNEE PAIN",
    description:
      "Gentle exercises for knee pain are an excellent place to start to reduce knee pain. In just about every case of knee pain we see, there is substantial weakness in the surrounding muscles. Our exercises can help to build this muscle, ultimately reducing the stress on your knee and allowing your joint to move more easily.",

    data: [
      {
        image:
          "https://responsephysio.com/wp-content/uploads/2021/06/leg-curl-website.jpg",
        video: "https://youtu.be/0FDn8B7zTgM",
        description:
          "Leg curl - Lying on your front bend you knee to bring your heel closer to your buttock to activate your hamstrings. Pause here then slowly lower the leg back down",
      },
      {
        image:
          "https://responsephysio.com/wp-content/uploads/2021/06/romanian-deadlift-website.jpg",
        video: "https://youtu.be/UM7J2bYaz1w",
        description:
          "Stand up straight - with your feet should width apart. Holding a weight in your hands slowly lower the weight towards the floor with a slight bend at your knees until you feel a stretch within your hamstrings. Then drive your hips forward to stand up straight again",
      },
      {
        image:
          "https://responsephysio.com/wp-content/uploads/2021/06/Knee-exercise-Inner-quad-range.jpg",
        video: "https://youtu.be/4c3WQaGF7zI",
        description:
          "Inner range quad - Place a foam roller or pillow underneath your knee. begin to straighten your knee and stop just before it is straight and hold this position for 3 seconds. Then fully straighten your knee and hold for a further 3 seconds before lowering it again.",
      },
    ],
  },
];

module.exports = { medicinesData, exerciseData, exerciseDetailByIdData };
