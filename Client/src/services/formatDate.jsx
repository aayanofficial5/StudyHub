const formatDate = (dateString) => {
  const date = new Date(dateString);
  // Define options for a human-friendly format
  const options = {
    weekday: 'long', // "Monday"
    year: 'numeric', // "2025"
    month: 'short',  // "Apr"
    day: 'numeric',  // "24"
    hour: 'numeric', // "5"
    minute: 'numeric', // "45"
    second: 'numeric', // "12"
    hour12: true,    // AM/PM format
  };

  return date.toLocaleString('en-US', options); // Format as per the options
};

export default formatDate;