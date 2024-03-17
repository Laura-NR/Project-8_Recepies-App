export default function NewRecipe({handleButtonClick}) {
    return (
        <button className="btn btn-warning" onClick={handleButtonClick}>Add a new recipe</button>
    );
}