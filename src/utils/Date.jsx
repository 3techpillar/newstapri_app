 export const formattedDate = new Date().toLocaleDateString('en-US', {
  weekday: 'long',    
  year: 'numeric',    
  month: 'long',      
  day: 'numeric'      
});

export const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (seconds < 60) return 'Just now';
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hr ago`;
    return new Date(date).toLocaleDateString();
};
