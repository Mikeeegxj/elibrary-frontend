import {
	Inter,
	Lato,
	Poppins,
	Roboto,
    Montserrat,
    Nunito_Sans,
	Oleo_Script_Swash_Caps,
	
} from "next/font/google";
export const inter = Inter({ subsets: ["latin"] });
export const lato = Lato({
	subsets: ["latin"],
	variable: "--font-lato",
	display: "swap",
	weight: ["100", "300", "400", "700", "900"],
});

export const poppins = Poppins({
	subsets: ["latin"],
	variable: "--font-poppins",
	display: "swap",
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const roboto = Roboto({
	subsets: ["latin"],
	variable: "--font-roboto",
	display: "swap",
	weight: ["100", "300", "400", "500", "700", "900"],
});

export const montserrat = Montserrat({
	subsets: ["latin"],
	variable: "--font-montserrat",
	display: "swap",
	weight: ["100", "300", "400", "500", "700", "900"],
});

export const nunito_sans =   Nunito_Sans({
	subsets: ["latin"],
	variable: "--font-nunito-sans",
	display: "swap",
	weight: ["300", "400", "500", "700", "900"],
});

export const oleo =   Oleo_Script_Swash_Caps({
	subsets: ["latin"],
	variable: "--font-oleo",
	display: "swap",
	weight: ["400","700"],
});


