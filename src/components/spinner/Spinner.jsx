


const Spinner = () => {
    return (
        <>
            {console.log("loading")}
            <div class="d-flex justify-content-center zindex-tooltip">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </>
    )
}

export default Spinner;