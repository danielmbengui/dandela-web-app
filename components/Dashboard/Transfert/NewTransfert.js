import { TextFieldCustom } from "../../MyComponents/TextFieldCustom";




    const NewTransfert = () => {
      return (
        <div>
          <h1>Création de produit</h1>
          <form>
            <label htmlFor="name">Nom du produit :</label>
            <input type="text" id="name" />
    
            <label htmlFor="description">Description du produit :</label>
            <textarea id="description" />
    
            <button type="submit">Créer le produit</button>
          </form>
        </div>
      );
    };
    
    export default NewTransfert;    