import PaymentPage from "@/components/PaymentPage";



const Username = async({params}) => {
    const {username} = await params;
    return (
        <PaymentPage username={decodeURI(username).replaceAll(" ", "")}/>
    )
}

export default Username
