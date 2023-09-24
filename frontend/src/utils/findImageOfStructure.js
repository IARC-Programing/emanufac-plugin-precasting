import oneJacket from "../assets/1";
import twoJacket from "../assets/2";
import threeJacket from "../assets/3";
import fourJacket from "../assets/4";

const findImageOfStructure = (jacket, amountOfMetal) => {
  let image = "";
  const searchWordOfMetal = `db${amountOfMetal}`;
  try {
    if (jacket === 1) {
      image = oneJacket[searchWordOfMetal];
    } else if (jacket === 2) {
      image = twoJacket[searchWordOfMetal];
    } else if (jacket === 3) {
      image = threeJacket[searchWordOfMetal];
    } else if (jacket === 4) {
      image = fourJacket[searchWordOfMetal];
    }
    return image;
  } catch (error) {
    return "";
  }
};

export default findImageOfStructure;
