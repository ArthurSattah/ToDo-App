type ListHeaderType = {
    orderByPriority: () => void,
    orderByTitle: () => void
}
function ListHeader({ orderByPriority, orderByTitle }: ListHeaderType) {
    return (
        <div className="flex justify-between p-4 rounded-md shadow-amber-500 shadow-md mx-5 sm:mx-10 text-left">
            <div className="flex-1 sm:flex-2 ">
                <p className="cursor-pointer w-fit" onClick={orderByTitle}>
                    Title
                </p>
            </div>
            <div className="flex-1  flex justify-end">
                <p className="cursor-pointer w-fit " onClick={orderByPriority}>
                    Priority
                </p>
            </div>
            <div className="flex-1 text-right">
                Status
            </div>
        </div>
    );
}

export default ListHeader;