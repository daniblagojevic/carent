import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Vehicle = {
    id: number;
    name: string;
    price: number;
    image: string;
};

type CartItem = {
    id: number;
    name: string;
    price: number; // flat price, not per-day
    //type: "insurance" | "protection" | "accessory";
    //image: string;
    quantity: number;
};

type CartState = {
    vehicle: Vehicle | null;
    cartItems: CartItem[];
    pickupDate: string | null;
    pickupTime: string | null;
    returnDate: string | null;
    returnTime: string | null;
    pickupLocation: string | null;
    returnLocation: string | null;
};

type CartActions = {
    setVehicle: (vehicle: Vehicle) => void;
    removeVehicle: () => void;
    addCartItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
    removeCartItem: (id: number) => void;
    updateCartItemQuantity: (id: number, quantity: number) => void;
    setDates: (pickupDate: string, pickupTime: string, returnDate: string, returnTime: string) => void;
    setLocations: (pickupLocation: string, returnLocation: string) => void;
    clearCart: () => void;
    getTotal: () => number; // for two decimals
};

export const useCartStore = create<CartState & CartActions>()(
    persist(
        (set, get) => ({
            vehicle: null,
            cartItems: [],
            pickupDate: null,
            pickupTime: null,
            returnDate: null,
            returnTime: null,
            pickupLocation: null,
            returnLocation: null,

            setVehicle: (vehicle) => set({ vehicle }),
            removeVehicle: () => set({ vehicle: null }),

            addCartItem: (item, quantity = 1) => {
                const exists = get().cartItems.find((i) => i.id === item.id);
                if (!exists) {
                    set((state) => ({
                        cartItems: [...state.cartItems, { ...item, quantity }],
                    }));
                }
                /*
                if (exists) {
                    set((state) => ({
                        cartItems: state.cartItems.map((i) =>
                            i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
                        ),
                    }));
                } else {
                    set((state) => ({
                        cartItems: [...state.cartItems, { ...item, quantity }],
                    }));
                }
                */
            },

            removeCartItem: (id) => {
                set((state) => ({
                    cartItems: state.cartItems.filter((i) => i.id !== id),
                }));
            },

            updateCartItemQuantity: (id, quantity) => {
                if (quantity <= 0) {
                    set((state) => ({
                        cartItems: state.cartItems.filter((i) => i.id !== id),
                    }));
                } else {
                    set((state) => ({
                        cartItems: state.cartItems.map((i) =>
                            i.id === id ? { ...i, quantity } : i
                        ),
                    }));
                }
            },

            setDates: (pickupDate, pickupTime, returnDate, returnTime) =>
                set(() => ({ pickupDate, pickupTime, returnDate, returnTime })),

            setLocations: (pickupLocation, returnLocation) =>
                set(() => ({ pickupLocation: pickupLocation, returnLocation: returnLocation })),

            clearCart: () =>
                set({
                    vehicle: null,
                    cartItems: [],
                    pickupDate: null,
                    pickupTime: null,
                    returnDate: null,
                    returnTime: null,
                    pickupLocation: null,
                    returnLocation: null,
                }),

            getTotal: () => {
                const { vehicle, cartItems, pickupDate, returnDate } = get();
                let total = 0;
                let days = 0;

                if (vehicle && pickupDate && returnDate) {
                    days = (new Date(returnDate).getTime() - new Date(pickupDate).getTime()) / (1000 * 60 * 60 * 24);
                    total += vehicle.price * days;
                }
                if (cartItems) {
                    cartItems.forEach((item) => {
                        total += item.price * item.quantity * days;
                    });
                }

                return (Number(total.toFixed(2)));
            },
        }),
        {
            name: "cart-storage",
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        }
    )
);
