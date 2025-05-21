const workoutPlans = [
  {
    id: 1,
    name: 'Cardio Workout',
    description: 'A high-intensity cardio workout',
    imageUrl: 'https://media.geeksforgeeks.org/wp-content/uploads/20240306123410/6.jpg',
    workouts: [
      { name: 'Jumping Jacks', description: '3 sets of 20 reps', duration: 5 },
      { name: 'Running', description: 'Run for 30 mins', duration: 30 },
      { name: 'Cycling', description: 'Cycle 45 mins', duration: 45 },
      { name: 'Jump Rope', description: '15 mins intervals', duration: 15 },
      { name: 'Swimming', description: '1 hour', duration: 60 },
      { name: 'HIIT', description: '20 mins', duration: 20 },
    ],
  },
  {
    id: 2,
    name: 'Strength Training',
    description: 'Build muscle and strength',
    imageUrl: 'https://media.geeksforgeeks.org/wp-content/uploads/20240306123403/5.jpg',
    workouts: [
      { name: 'Squats', description: '3 sets of 10 reps', duration: 15 },
      { name: 'Push-ups', description: '3 sets of 15 reps', duration: 10 },
      { name: 'Pull-ups', description: '3 sets of 8', duration: 20 },
      { name: 'Deadlifts', description: '3 sets of 5 reps', duration: 25 },
      { name: 'Bench Press', description: '3 sets of 12 reps', duration: 20 },
      { name: 'Dumbbell Rows', description: '3 sets of 10 per arm', duration: 15 },
    ],
  },
  {
    id: 3,
    name: 'Yoga Routine',
    description: 'Yoga poses to improve flexibility',
    imageUrl: 'https://media.geeksforgeeks.org/wp-content/uploads/20240306123356/4.jpg',
    workouts: [
      { name: 'Sun Salutation', description: '5 rounds of Sun Salutation', duration: 15 },
      { name: 'Warrior Pose', description: 'Hold for 1 minute each side', duration: 10 },
      { name: 'Downward-Facing Dog', description: 'Hold for 1 minute', duration: 5 },
      { name: 'Tree Pose', description: 'Hold for 30 seconds each side', duration: 10 },
      { name: "Child's Pose", description: "Relax for 3 minutes", duration: 20 },
    ],
  },
  {
    id: 4,
    name: 'Core Strengthening',
    description: 'Focus on strengthening the core muscles',
    imageUrl: 'https://media.geeksforgeeks.org/wp-content/uploads/20240306122911/3.jpg',
    workouts: [
      { name: 'Plank', description: 'Hold for 1 minute', duration: 10 },
      { name: 'Russian Twists', description: '3 sets of 20 reps', duration: 10 },
      { name: 'Leg Raises', description: '3 sets of 15 reps', duration: 15 },
      { name: 'Crunches', description: '3 sets of 20 reps', duration: 10 },
      { name: 'Bicycle Crunches', description: '3 sets of 20 reps', duration: 15 },
    ],
  },
  {
    id: 5,
    name: 'Pilates Routine',
    description: 'Pilates exercises for strength and flexibility',
    imageUrl: 'https://media.geeksforgeeks.org/wp-content/uploads/20240306122854/1.jpg',
    workouts: [
      { name: 'Hundred', description: '100 pumps of the arms in V-sit', duration: 10 },
      { name: 'Roll-Up', description: '3 sets of 10 reps', duration: 15 },
      { name: 'Single Leg Stretch', description: '3 sets of 10 reps per leg', duration: 15 },
      { name: 'Swimming', description: '3 sets of 20 reps', duration: 15 },
      { name: 'Leg Pull Front', description: '3 sets of 10 reps', duration: 15 },
    ],
  },
  {
    id: 6,
    name: 'Full Body Circuit',
    description: 'Workout targeting all major muscle groups',
    imageUrl: 'https://media.geeksforgeeks.org/wp-content/uploads/20240306123640/2.jpg',
    workouts: [
      { name: 'Burpees', description: '3 sets of 10 reps', duration: 15 },
      { name: 'Mountain Climbers', description: '3 sets of 20 reps', duration: 10 },
      { name: 'Dumbbell Lunges', description: '3 sets of 10 reps per leg', duration: 15 },
      { name: 'Push Press', description: '3 sets of 10 reps', duration: 15 },
      { name: 'Plank with Shoulder Taps', description: 'Hold plank and tap shoulders for 1 minute', duration: 20 },
    ],
  },
];

export default workoutPlans;
