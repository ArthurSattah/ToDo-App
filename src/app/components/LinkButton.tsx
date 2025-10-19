import Link from "next/link";
type LinkButtonType = {
    href: string,
    title: string,
    variants?:string 

}
function LinkButton({ href, title,variants }: LinkButtonType) {
    return (
        <Link href={href} className={`${variants}  p-2 rounded-xl hover:bg-stone-600 `}>{title}</Link>
    );
}

export default LinkButton;