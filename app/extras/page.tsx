"use client";

import Loading from "@/components/loading";
import ReviewOrder from "@/components/reviewOrder";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import { useEffect, useState } from "react";

const extras = [
    {
        id: 4,
        name: "Navigation system",
        price: 9.96,
        enable_quantity: false,
        icon: (<svg xmlns="http://www.w3.org/2000/svg" className="w-5" viewBox="0 0 640 640"><path fill="#000000" d="M128 252.6C128 148.4 214 64 320 64C426 64 512 148.4 512 252.6C512 371.9 391.8 514.9 341.6 569.4C329.8 582.2 310.1 582.2 298.3 569.4C248.1 514.9 127.9 371.9 127.9 252.6zM320 320C355.3 320 384 291.3 384 256C384 220.7 355.3 192 320 192C284.7 192 256 220.7 256 256C256 291.3 284.7 320 320 320z" /></svg>)
    },
    {
        id: 5,
        name: "Baby Seat",
        price: 15.84,
        enable_quantity: true,
        quantity: {
            max: 3,
            min: 1,
        },
        icon: (<svg fill="#000000" className="w-5" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 195.92 195.92" stroke="#000000" strokeWidth="5.877599999999999"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M138.213,192.029H13.301c-3.921,0-7.276-1.505-9.703-4.352c-2.947-3.458-4.192-8.72-3.332-14.073 c0.927-5.768,4.281-13.981,10.682-18.15c10.606-6.906,21.658-6.9,25.114-6.696c6.28-5.176,14.753-8.708,26.185-8.708 c17.838,0,34.099,2.265,46.746,4.813c0.54-4.438,1.943-13.861,5.2-26.121c4.125-15.531,10.641-31.238,11.704-33.761 c0.231-7.683,0.834-15.535,1.956-23.292c-3.629-1.252-6.669-3.698-8.699-7.035c-2.389-3.93-3.035-8.535-1.82-12.97l5.141-18.769 c2.283-8.337,10.711-13.551,19.191-11.86l10.096,2.01c18.766-13.123,41.856-8.338,42.194-8.262c1.316,0.289,2.166,1.568,1.922,2.894 l-29.586,160.944C163.8,182.193,151.992,192.029,138.213,192.029z M23.295,187.029h114.917c11.366,0,21.106-8.113,23.161-19.292 L190.503,9.28c-6.119-0.855-22.598-1.944-36.354,8.102c-0.223,0.249-0.493,0.451-0.793,0.595c-7.268,5.58-13.69,14.38-17.294,28.118 c-12.428,47.381,0.92,106.981,1.056,107.578c0.204,0.893-0.097,1.826-0.785,2.433c-0.688,0.604-1.652,0.786-2.513,0.472 c-0.315-0.115-31.932-11.527-71.572-11.527c-9.455,0-17.325,2.665-23.542,7.95c-0.139,0.154-0.297,0.291-0.47,0.407 c-3.938,3.479-7.194,8.039-9.75,13.666C24.867,175.041,23.679,183.06,23.295,187.029z M30.94,153.858 c-4.477,0.388-11.012,1.716-17.263,5.785c-4.708,3.066-7.648,9.62-8.474,14.754c-0.631,3.927,0.192,7.68,2.201,10.037 c1.467,1.722,3.451,2.595,5.897,2.595h4.986C18.853,181.072,21.227,165.46,30.94,153.858z M113.909,145.904 c7.737,1.722,13.756,3.449,17.459,4.602c-1.623-8.441-4.979-28.44-5.512-51.719c-2.226,6.049-4.82,13.669-6.831,21.238 C115.758,132.326,114.394,141.844,113.909,145.904z M138.452,15.739c-5.1,0-9.764,3.416-11.155,8.497l-5.141,18.769 c-0.848,3.095-0.396,6.31,1.271,9.052c1.257,2.067,3.071,3.646,5.233,4.584c0.701-3.991,1.549-7.942,2.565-11.814 c3.33-12.697,8.947-21.542,15.489-27.668l-6.024-1.198C139.941,15.81,139.192,15.739,138.452,15.739z"></path> </g></svg>)
    },
    {
        id: 8,
        name: "Booster seat",
        price: 13.83,
        enable_quantity: true,
        quantity: {
            max: 3,
            min: 1,
        },
        icon: (<svg fill="#000000" className="w-5" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 195.92 195.92" stroke="#000000" strokeWidth="5.877599999999999"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M138.213,192.029H13.301c-3.921,0-7.276-1.505-9.703-4.352c-2.947-3.458-4.192-8.72-3.332-14.073 c0.927-5.768,4.281-13.981,10.682-18.15c10.606-6.906,21.658-6.9,25.114-6.696c6.28-5.176,14.753-8.708,26.185-8.708 c17.838,0,34.099,2.265,46.746,4.813c0.54-4.438,1.943-13.861,5.2-26.121c4.125-15.531,10.641-31.238,11.704-33.761 c0.231-7.683,0.834-15.535,1.956-23.292c-3.629-1.252-6.669-3.698-8.699-7.035c-2.389-3.93-3.035-8.535-1.82-12.97l5.141-18.769 c2.283-8.337,10.711-13.551,19.191-11.86l10.096,2.01c18.766-13.123,41.856-8.338,42.194-8.262c1.316,0.289,2.166,1.568,1.922,2.894 l-29.586,160.944C163.8,182.193,151.992,192.029,138.213,192.029z M23.295,187.029h114.917c11.366,0,21.106-8.113,23.161-19.292 L190.503,9.28c-6.119-0.855-22.598-1.944-36.354,8.102c-0.223,0.249-0.493,0.451-0.793,0.595c-7.268,5.58-13.69,14.38-17.294,28.118 c-12.428,47.381,0.92,106.981,1.056,107.578c0.204,0.893-0.097,1.826-0.785,2.433c-0.688,0.604-1.652,0.786-2.513,0.472 c-0.315-0.115-31.932-11.527-71.572-11.527c-9.455,0-17.325,2.665-23.542,7.95c-0.139,0.154-0.297,0.291-0.47,0.407 c-3.938,3.479-7.194,8.039-9.75,13.666C24.867,175.041,23.679,183.06,23.295,187.029z M30.94,153.858 c-4.477,0.388-11.012,1.716-17.263,5.785c-4.708,3.066-7.648,9.62-8.474,14.754c-0.631,3.927,0.192,7.68,2.201,10.037 c1.467,1.722,3.451,2.595,5.897,2.595h4.986C18.853,181.072,21.227,165.46,30.94,153.858z M113.909,145.904 c7.737,1.722,13.756,3.449,17.459,4.602c-1.623-8.441-4.979-28.44-5.512-51.719c-2.226,6.049-4.82,13.669-6.831,21.238 C115.758,132.326,114.394,141.844,113.909,145.904z M138.452,15.739c-5.1,0-9.764,3.416-11.155,8.497l-5.141,18.769 c-0.848,3.095-0.396,6.31,1.271,9.052c1.257,2.067,3.071,3.646,5.233,4.584c0.701-3.991,1.549-7.942,2.565-11.814 c3.33-12.697,8.947-21.542,15.489-27.668l-6.024-1.198C139.941,15.81,139.192,15.739,138.452,15.739z"></path> </g></svg>)
    },
    {
        id: 6,
        name: "Additional Driver",
        price: 7.15,
        enable_quantity: true,
        quantity: {
            max: 2,
            min: 1,
        },
        icon: (<svg xmlns="http://www.w3.org/2000/svg" className="w-5" viewBox="0 0 640 640"><path fill="#000000" d="M320 80C377.4 80 424 126.6 424 184C424 241.4 377.4 288 320 288C262.6 288 216 241.4 216 184C216 126.6 262.6 80 320 80zM96 152C135.8 152 168 184.2 168 224C168 263.8 135.8 296 96 296C56.2 296 24 263.8 24 224C24 184.2 56.2 152 96 152zM0 480C0 409.3 57.3 352 128 352C140.8 352 153.2 353.9 164.9 357.4C132 394.2 112 442.8 112 496L112 512C112 523.4 114.4 534.2 118.7 544L32 544C14.3 544 0 529.7 0 512L0 480zM521.3 544C525.6 534.2 528 523.4 528 512L528 496C528 442.8 508 394.2 475.1 357.4C486.8 353.9 499.2 352 512 352C582.7 352 640 409.3 640 480L640 512C640 529.7 625.7 544 608 544L521.3 544zM472 224C472 184.2 504.2 152 544 152C583.8 152 616 184.2 616 224C616 263.8 583.8 296 544 296C504.2 296 472 263.8 472 224zM160 496C160 407.6 231.6 336 320 336C408.4 336 480 407.6 480 496L480 512C480 529.7 465.7 544 448 544L192 544C174.3 544 160 529.7 160 512L160 496z" /></svg>)
    },
    {
        id: 7,
        name: "Roadside Assistance",
        price: 6.45,
        enable_quantity: false,
        icon: (<svg fill="#000000" className="w-5" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M4.96875 4C4.726563 4.007813 4.464844 4.097656 4.28125 4.28125L3.28125 5.28125C2.917969 5.644531 2.890625 6.226563 3.21875 6.625L17 23.34375L17 26L27 26L27 23C27 22.707031 26.878906 22.441406 26.65625 22.25L5.65625 4.25C5.457031 4.082031 5.210938 3.992188 4.96875 4 Z M 4 10.71875L4 19C4 19.550781 4.449219 20 5 20C5.550781 20 6 20.449219 6 21C6 21.550781 5.550781 22 5 22C4.449219 22 4 21.550781 4 21L2 21C2 22.652344 3.347656 24 5 24C6.652344 24 8 22.652344 8 21C8 19.695313 7.164063 18.570313 6 18.15625L6 13.15625 Z M 32 13C30.347656 13 29 14.347656 29 16L29 38L33.09375 38C33.574219 40.832031 36.03125 43 39 43C41.96875 43 44.429688 40.832031 44.90625 38L47 38C48.652344 38 50 36.652344 50 35L50 25.375C50 23.363281 48.550781 21.308594 48.375 21.0625L44.21875 15.5C43.265625 14.351563 41.773438 13 40 13 Z M 38 19L44.34375 19L46.78125 22.25C47.085938 22.675781 47.816406 23.902344 47.96875 25L38 25C37.550781 25 37 24.449219 37 24L37 20C37 19.445313 37.546875 19 38 19 Z M 0 28L0 35C0 36.652344 1.347656 38 3 38L7.09375 38C7.574219 40.832031 10.03125 43 13 43C15.96875 43 18.425781 40.832031 18.90625 38L27 38L27 28 Z M 13 33C15.207031 33 17 34.792969 17 37C17 39.207031 15.207031 41 13 41C10.792969 41 9 39.207031 9 37C9 34.792969 10.792969 33 13 33 Z M 39 33C41.207031 33 43 34.792969 43 37C43 39.207031 41.207031 41 39 41C36.792969 41 35 39.207031 35 37C35 34.792969 36.792969 33 39 33Z"></path></g></svg>)
    },
    {
        id: 9,
        name: "Snow chains",
        price: 4.69,
        enable_quantity: false,
        icon: (<svg className="w-5" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><g> <path d="M498.842,256c0-1.092-0.065-2.169-0.08-3.277c4.418-1.182,8.836-2.436,13.238-3.739 c-0.348-12.057-1.489-24.098-3.52-36.002c-4.556-0.445-9.136-0.809-13.708-1.124c-3.318-18.046-8.594-35.411-15.666-51.838 c3.609-2.768,7.186-5.632,10.762-8.529c-4.96-11.013-10.657-21.687-17.099-31.882c-4.369,1.343-8.731,2.767-13.085,4.232 c-9.913-15.253-21.476-29.318-34.463-41.941c2.274-3.965,4.636-7.858,6.821-11.896c-8.764-8.286-18.11-15.949-27.934-22.957 c-3.544,2.929-6.886,6.004-10.325,8.999c-14.841-10.254-30.904-18.871-47.889-25.628c0.599-4.548,1.125-9.112,1.594-13.676 c-11.272-4.322-22.884-7.818-34.65-10.504c-2.153,4.079-4.224,8.133-6.24,12.219c-16.33-3.456-33.25-5.308-50.599-5.308 c-1.158,0-2.29,0.065-3.447,0.097C251.355,8.82,250.279,4.394,248.968,0c-12.041,0.348-24.082,1.489-35.985,3.52 c-0.445,4.564-0.81,9.127-1.125,13.708c-18.069,3.318-35.41,8.594-51.837,15.65c-2.792-3.601-5.632-7.178-8.529-10.746 c-11.013,4.952-21.678,10.649-31.883,17.099c1.343,4.369,2.768,8.731,4.232,13.085C108.596,62.22,94.516,73.792,81.9,86.779 c-3.965-2.282-7.857-4.653-11.895-6.821c-8.286,8.755-15.949,18.102-22.957,27.934c2.921,3.544,6.004,6.894,8.998,10.342 c-10.252,14.841-18.87,30.871-25.635,47.864c-4.54-0.574-9.096-1.108-13.652-1.578c-4.337,11.297-7.833,22.876-10.52,34.634 c4.078,2.152,8.14,4.232,12.227,6.247c-3.464,16.33-5.316,33.25-5.316,50.599c0,1.092,0.064,2.193,0.072,3.277 c-4.402,1.182-8.828,2.428-13.222,3.754c0.348,12.033,1.482,24.074,3.513,35.977c4.556,0.438,9.135,0.818,13.715,1.134 c3.318,18.045,8.594,35.41,15.65,51.837c-3.601,2.776-7.17,5.624-10.746,8.521c4.944,11.03,10.641,21.695,17.098,31.891 c4.37-1.336,8.731-2.744,13.069-4.233c9.92,15.27,21.492,29.302,34.48,41.942c-2.282,3.965-4.653,7.848-6.821,11.878 c8.747,8.303,18.101,15.974,27.934,22.974c3.544-2.937,6.886-6.012,10.325-9.006c14.841,10.252,30.888,18.878,47.881,25.643 c-0.591,4.556-1.134,9.112-1.586,13.676c11.272,4.322,22.876,7.809,34.65,10.496c2.136-4.078,4.224-8.149,6.238-12.227 c16.33,3.464,33.25,5.309,50.6,5.309c1.157,0,2.29-0.065,3.439-0.073c1.206,4.402,2.266,8.828,3.577,13.23 c12.041-0.347,24.09-1.481,35.985-3.512c0.445-4.564,0.825-9.136,1.141-13.716c18.046-3.317,35.412-8.577,51.838-15.666 c2.768,3.617,5.616,7.186,8.512,10.762c11.03-4.944,21.687-10.648,31.899-17.098c-1.335-4.362-2.743-8.731-4.232-13.085 c15.245-9.913,29.326-21.469,41.941-34.464c3.965,2.29,7.85,4.644,11.888,6.821c8.294-8.764,15.965-18.101,22.957-27.934 c-2.937-3.544-5.996-6.886-8.99-10.326c10.252-14.841,18.846-30.895,25.636-47.889c4.556,0.599,9.112,1.117,13.667,1.57 c4.321-11.248,7.801-22.86,10.504-34.626c-4.079-2.136-8.149-4.224-12.228-6.238C496.998,290.27,498.842,273.357,498.842,256z M256,410.793c-85.501,0-154.809-69.292-154.809-154.793c0-85.5,69.308-154.8,154.809-154.8c85.484,0,154.809,69.3,154.809,154.8 C410.809,341.501,341.485,410.793,256,410.793z"></path> <path d="M256,270.962c8.262,0,14.962-6.692,14.962-14.962c0-8.27-6.7-14.97-14.962-14.97 c-8.278,0-14.978,6.7-14.978,14.97C241.022,264.27,247.722,270.962,256,270.962z"></path> <path d="M156.136,199.687c1.044,2.808,3.31,4.977,6.15,5.907l53.367,17.342c4.968,1.602,10.406,0.752,14.623-2.323 c4.232-3.075,6.724-7.979,6.724-13.206v-56.062c0-2.994-1.376-5.826-3.714-7.671c-2.347-1.861-5.406-2.541-8.327-1.861 c0,0,0.802-0.606-4.588,1.085c-25.191,7.938-46.756,24.042-61.572,45.218c-3.035,4.354-1.861,3.107-1.861,3.107 C155.384,193.772,155.092,196.887,156.136,199.687z"></path> <path d="M214.391,269.53c-1.61-4.977-5.51-8.877-10.463-10.479l-53.327-17.325c-2.865-0.931-5.956-0.494-8.448,1.157 c-2.5,1.659-4.094,4.369-4.329,7.347c0,0-0.34-0.946-0.388,4.71c-0.251,26.396,8.407,51.878,23.96,72.52 c3.204,4.241,2.379,2.744,2.379,2.744c1.95,2.25,4.823,3.496,7.801,3.374c2.994-0.13,5.762-1.602,7.517-4.03l32.967-45.396 C215.152,279.936,216.001,274.482,214.391,269.53z"></path> <path d="M269.198,306.47c-3.074-4.216-7.978-6.716-13.198-6.716c-5.22,0-10.123,2.5-13.206,6.716l-32.943,45.356 c-1.764,2.42-2.314,5.51-1.513,8.399c0.818,2.889,2.889,5.228,5.656,6.393c0,0-1.011,0.025,4.346,1.82 c25.044,8.392,51.951,8.028,76.388-0.396c5.025-1.724,3.334-1.4,3.334-1.4c2.752-1.158,4.823-3.512,5.616-6.385 c0.817-2.889,0.251-5.98-1.506-8.392L269.198,306.47z"></path> <path d="M361.448,241.709l-53.375,17.342c-4.952,1.602-8.853,5.502-10.471,10.479 c-1.611,4.953-0.752,10.407,2.323,14.614l32.958,45.356c1.748,2.436,4.515,3.893,7.509,4.038c2.995,0.122,5.868-1.141,7.826-3.406 c0,0-0.283,0.963,3.084-3.576c15.706-21.218,23.685-46.934,23.224-72.764c-0.089-5.3-0.307-3.593-0.307-3.593 c-0.235-2.986-1.846-5.697-4.338-7.348C367.395,241.216,364.28,240.779,361.448,241.709z"></path> <path d="M281.708,220.613c4.233,3.059,9.67,3.924,14.63,2.323l53.327-17.342c2.848-0.922,5.114-3.099,6.15-5.907 c1.036-2.8,0.744-5.923-0.818-8.488c0,0,0.834,0.567-2.452-4.03c-15.318-21.508-37.288-37.038-62.025-44.596 c-5.065-1.537-3.528-0.809-3.528-0.809c-2.905-0.68-5.956,0.008-8.31,1.877c-2.331,1.837-3.69,4.669-3.69,7.656v56.11 C274.984,212.634,277.492,217.538,281.708,220.613z"></path> </g> </g></svg>)
    },
];

const deductibles = [
    {
        id: 1,
        name: "Maximum deductible",
        deductible: "Deductible: up to $1,180.48",
        text: "€1,000.00 (approx. $1,180.48) financial responsibility",
        price: 0,
    },
    {
        id: 2,
        name: "Loss Damage Waiver with reduced deductible",
        deductible: "Deductible: up to $354.14",
        text: "€300.00 (approx. $354.14) financial responsibility",
        price: 16.41,
    },
    {
        id: 3,
        name: "Loss Damage Waiver (including theft protection) with minimum deductible",
        deductible: "",
        text: "€0.00 financial responsibility",
        price: 26.63,
    }
];

export default function Extras() {
    const addCartItem = useCartStore((state) => state.addCartItem);
    const removeCartItem = useCartStore((state) => state.removeCartItem);
    const updateCartItemQuantity = useCartStore((state) => state.updateCartItemQuantity);
    const cartItems = useCartStore((state) => state.cartItems ?? []);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    // deductibles

    const handleDeductible = (item: typeof deductibles[0]) => {
        deductibles.forEach((deductible) => {
            removeCartItem(deductible.id);
        });
        if (Number(item.price) > 0) {
            addCartItem(
                { id: item.id, name: item.name, price: Number(item.price) },
                1
            );
        }
    };

    const deductableChecked = (item: typeof deductibles[0]) => {
        let deductablesInCart = false;
        deductibles.forEach((deductible) => {
            if (cartItems.find(i => i.id === deductible.id)) {
                deductablesInCart = true;
                return;
            }
        });
        if (deductablesInCart == false && item.price == 0) {
            return true;
        } else {
            //return !!cartItems.find(i => i.id === item.id);
            if (cartItems.find(i => i.id === item.id)) {
                return true;
            } else {
                return false;
            }
        }

    }

    // extras

    const getQuantityById = (id: number) => {
        const item = cartItems.find((i) => i.id === id);
        return item ? item.quantity : 0;
    };

    const handleCartItemQuantity = (item: typeof extras[0], change: number) => {
        const currentQty = getQuantityById(item.id);
        const newQty = Math.max(currentQty + change, 1); // minimum 1
        if (change < 0) { // decrement
            updateCartItemQuantity(item.id, newQty);
        } else if (change > 0) { // increment
            if (currentQty > 0 && item.quantity?.max && item.quantity?.max > currentQty) {
                updateCartItemQuantity(item.id, newQty);
            }
        }
        /*
        if (currentQty > 0 && item.quantity?.max && item.quantity?.max > currentQty) {
            const newQty = Math.max(currentQty + change, 1); // minimum 1
            updateCartItemQuantity(item.id, newQty);
        }
        */
    };

    const handleCartItem = (item: typeof extras[0], e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            addCartItem(
                { id: item.id, name: item.name, price: Number(item.price) },
                1
            );
        } else {
            removeCartItem(item.id);
        }
    };


    return (
        <>
            {!loading ? (
                <section>
                    <div className="container py-12">
                        <div className="grid grid-cols-12 gap-12">
                            <div className="col-span-8">
                                <div className="pb-6">
                                    <a className="inline-flex items-center text-sm gap-1 hover:underline text-majorelle-600" href="/search-results">
                                        <svg className="h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"></path></svg>
                                        Back to search results
                                    </a>
                                </div>
                                <div className="pb-12">
                                    <h4 className="mb-4">Loss Damage Waiver</h4>
                                    <p>Enjoy the peace of mind of knowing you're protected from high costs in case your vehicle is stolen or damaged. Instead of paying up to the full vehicle value, you'd only need to cover the deductible amount specified.</p>
                                </div>
                                <div className="pb-12">
                                    <div className="grid grid-cols-12 gap-6">
                                        {deductibles.map((item, index) => (
                                            <div className="col-span-4" key={item.id}>
                                                <label className="cursor-pointer block h-full">
                                                    <div className={`border-2 ${deductableChecked(item) ? "border-majorelle-600" : "border-gray-200"} rounded-xl overflow-hidden h-full flex flex-col`}>
                                                        <div className="bg-lotion p-4 h-46 flex flex-col justify-between shrink-0">
                                                            <div className="flex items-top justify-between gap-4">
                                                                <div>
                                                                    <h5 className="font-semibold">{item.name}</h5>
                                                                </div>
                                                                <div>
                                                                    <input
                                                                        type="radio"
                                                                        name="deductible"
                                                                        checked={deductableChecked(item)}
                                                                        onChange={() => handleDeductible(item)}
                                                                        className="shrink-0 mt-0.5 border-gray-200 radio-xl rounded-full text-majorelle-600 checked:border-majorelle-600 focus:ring-majorelle-600"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="pt-4">
                                                                {item.deductible ? (
                                                                    <p className="text-sm">{item.deductible}</p>
                                                                ) : (
                                                                    <p className="text-sm text-green-600">No deductible</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="p-4 h-full flex flex-col justify-between">
                                                            <div className="pb-6">
                                                                <p className="text-sm">{item.text}</p>
                                                            </div>
                                                            <div>
                                                                {item.price ? (
                                                                    <div className="text-sm">
                                                                        <span className="text-xl font-semibold">${item.price}</span> / day
                                                                    </div>
                                                                ) : (
                                                                    <div className="text-xl font-semibold">Included</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="pb-6">
                                    <h4 className="pb-6">Which add-ons do you need?</h4>
                                    <div className="bg-majorelle-100 border border-majorelle-600 text-sm text-majorelle-600 rounded-lg py-4 px-6 flex gap-3" role="alert" aria-labelledby="hs-soft-color-info-label">
                                        <svg className="shrink-0 size-4 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                                        <div>Drivers must have held their driver's license for at least 2 year(s) for this vehicle</div>
                                    </div>
                                </div>
                                <div className="">
                                    {extras.map((item) => (
                                        <div key={item.id} className="pb-4">
                                            <label className={`border-2 ${cartItems.find((i) => i.id === item.id) ? "border-majorelle-600" : "border-gray-200"} rounded-xl overflow-hidden cursor-pointer block py-4 px-6`} htmlFor={`switch-${item.id}`}>
                                                <div className="flex items-center justify-between">
                                                    <div className="w-full">
                                                        <div className="flex gap-4">
                                                            <div>
                                                                <div className="">{item.icon}</div>
                                                            </div>
                                                            <div>
                                                                <div className="font-semibold pb-2">{item.name}</div>
                                                                <div className="font-semibold">${(item.price).toFixed(2)} <span className="text-sm"> / day</span></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="w-fit leading-none flex gap-4 items-center">
                                                        {item.enable_quantity && cartItems.find((i) => i.id === item.id) && (
                                                            <div>
                                                                <div className="py-2 px-3 inline-block bg-white border border-gray-200 rounded-lg">
                                                                    <div className="flex items-center gap-x-1.5">
                                                                        <button
                                                                            type="button"
                                                                            className="size-8 cursor-pointer inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                                                                            onClick={() => handleCartItemQuantity(item, -1)}
                                                                        >
                                                                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path></svg>
                                                                        </button>
                                                                        <input
                                                                            className="p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                                                            type="number"
                                                                            readOnly
                                                                            value={getQuantityById(item.id) || 1}
                                                                        />
                                                                        <button
                                                                            type="button"
                                                                            className="size-8 cursor-pointer inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                                                                            onClick={() => handleCartItemQuantity(item, 1)}
                                                                        >
                                                                            <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                        <div>
                                                            <div className="relative inline-block w-11 h-6 cursor-pointer">
                                                                <input
                                                                    type="checkbox"
                                                                    id={`switch-${item.id}`}
                                                                    className="peer sr-only"
                                                                    checked={!!cartItems.find(i => i.id === item.id)}
                                                                    onChange={(e) => handleCartItem(item, e)}
                                                                />
                                                                <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-majorelle-600 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></span>
                                                                <span className="absolute top-1/2 start-0.5 -translate-y-1/2 size-5 bg-white rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full"></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="col-span-4">
                                <ReviewOrder />
                                <div className="mb-6">
                                    <Link href="/checkout" className="btn btn-primary w-full" scroll={true}>Checkout</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <Loading/>
            )}
        </>
    );
}