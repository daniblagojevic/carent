
export function getRentalDays(pickupDate: string, returnDate: string) {
    let rentalDays = 1;
    if (returnDate && pickupDate) {
        rentalDays = (new Date(returnDate).getTime() - new Date(pickupDate).getTime()) / (1000 * 60 * 60 * 24);
    }
    return rentalDays;
}