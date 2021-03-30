export default function OrderSteps(props){
    return(
        <div className = "row checkout-steps">
            <div className={props.step1 ? 'active':''}>Paid</div>
            <div className={props.step2 ? 'active':''}>Ready for pick up</div>
            <div className={props.step3 ? 'active':''}>Picked Up</div>
        </div>
    )
}