import { FetchBookDetail } from "@/actions/book-actions"
import BookDetail from "./BookDetail"
export default async function MainResourceDetail({params}) {
    const {id} = params
    const res = await FetchBookDetail(id)
    return(
        <BookDetail res={res}/>
    )
}