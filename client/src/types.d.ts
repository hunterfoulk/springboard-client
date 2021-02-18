
interface Category {
    id: number,
    title: string,
    image: string,
    details: string
    threads: Thread[]
}

interface Thread {
    thread_title: string,
    date: any,
    user: string,
    thread_id: number
    category: number,
    body: string,
    sharing: boolean
    title?: string
    comments: []
}

interface Comment {
    message: string,
    comment_id?: number,
    date?: string,
    user?: string,
    thread_id?: number,
    replying?: boolean,
    reporting?: boolean
    repliesShow?: boolean,
    replies?: Reply[]

}

interface Reply {
    reply_id: number,
    comment_id: number,
    reply_message: string,
    user: string,
    date: string
}

