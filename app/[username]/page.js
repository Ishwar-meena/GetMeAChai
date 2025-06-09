import PaymentPage from "@/components/PaymentPage";



const Username = async({params,searchParams}) => {
    const {username} = await params;
    const success = (await searchParams).success;
    return (
        <PaymentPage 
         success={success}
         username={decodeURI(username).replaceAll(" ", "")}
         />
    )
}

export default Username
