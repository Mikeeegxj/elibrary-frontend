import Elibrary from "./elibrary"
import { FetchCategories } from "@/actions/book-actions"
export default async function ElibraryMain() {
    const resCat = await FetchCategories()
    return(
        <Elibrary resCat={resCat} />
    )
}