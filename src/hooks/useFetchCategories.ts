import React from "react";
import type { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../redux/questions.slice";

export const useFetchCategories = () => {
  
  const isFetchedCategories = useSelector(
    (state: RootState) => state.questions.isFetchedCategories
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (isFetchedCategories) return;

    async function fetchCategories() {
      try {
        const resp = await fetch("https://opentdb.com/api_category.php");
        const data = await resp.json();
        dispatch(setCategories(data.trivia_categories));
        // } catch (err) {
        //   console.error("can not fetch categories", err);
        // }
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err.message);
        }
      }
    }
    fetchCategories();
  }, [dispatch, isFetchedCategories]);
};
