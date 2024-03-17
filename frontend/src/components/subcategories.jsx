export default function Subcategories() {
    return (
        <>
            <div className="btn-group" role="group">
                <div>
                    <input type="checkbox" className="btn-check" id="tried" autoComplete="off" />
                    <label className="btn btn-outline-primary" htmlFor="tried">Tried</label>
                </div>
                <div>
                    <input type="checkbox" className="btn-check" id="liked" autoComplete="off" />
                    <label className="btn btn-outline-primary" htmlFor="liked">Liked</label>
                </div>
            </div>
        </>
    );
}