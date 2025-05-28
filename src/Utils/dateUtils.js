export const getToday = () =>{
    const today = new Date();
    today.setHours(0,0,0,0);
    return today;
}

export const getTomorrow = () =>{
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate()+1);
    tomorrow.setHours(0,0,0,0);
    return tomorrow;
}

export const isSameDate = (date1,date2) =>
    { 
        date1.toDateString() === date2.toDateString()
    };

export const formatDate = (dueDate) =>{
    if(!dueDate) return "No Due Date";
   
    const date = dueDate.toDate?.() || new Date(dueDate);
    const today = getToday();
    const tomorrow = getTomorrow();
    if(isSameDate(date,today)) return "Today";
    if(isSameDate(date,tomorrow)) return "Tomorrow";

    return date.toLocaleDateString();
}    