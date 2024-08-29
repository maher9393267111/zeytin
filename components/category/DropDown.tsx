import { useState, useEffect } from "react";
import { map } from "lodash";
import { Select, MenuItem } from "@material-ui/core";
import OutlinedInput from "@mui/material/OutlinedInput";
import styled from "styled-components";
import axios from "axios";
import { message } from "antd";

interface ICategory {
  _id: string;
  name: string;
  nametr:string;
  description: string;
}

const StyledMenuItem = styled(MenuItem)`
  &:hover {
    background-color: #f5f5f5;
  }
  outline: none !important;
  color: #29221f !important;
  margin-bottom: 5px !important;
`;

interface DropDownCategoriesProps {
  setCategory: (category: string) => void;
  selectedCategory?: string;
  getAllCategories?: boolean;
  dir?:string
}

export default function DropDownCategories(props: DropDownCategoriesProps) {
  const [listCategories, setListCategories] = useState<ICategory[]>();
  const [category, setCategory] = useState("");


  const dir = 'rtl'


  useEffect(() => {
    axios
      .get("/api/category/handler")
      .then((res) => {
        const { data } = res;
        setListCategories(data);
        data.forEach((categoryItem: ICategory) => {
          if (categoryItem._id === props.selectedCategory) {
            setCategory(categoryItem.name);
          }
        });
      })
      .catch((err) => {
        message.error("حدث خطأ أثناء جلب الفئات");
      });
  }, []);
  return (
    <Select
      fullWidth
      input={<OutlinedInput />}
      inputProps={{ "aria-label": "Without label" }}
      displayEmpty
      value={category}
      onChange={(event) => setCategory(event.target.value as string)}
      renderValue={(selected) => {
        if (!selected) {
          return '  جميع الاذواق تصنيفات' ;
          // return props.getAllCategories && dir ==='rtl' ? '  جميع الاذواق تصنيفات' : 'All Categories';
        }
        return selected.toString();
      }}
    >
      {props.getAllCategories ? (
        <StyledMenuItem
          title=  {dir ==='rtl' ? '  جميع الاذواق تصنيفات' : 'All Categories'}
          onClick={() => props.setCategory("all")}
          key="all"
          id="all"
          value=  {dir ==='rtl' ? '  جميع الاذواق تصنيفات' : 'All Categories'}
        >
          {dir ==='rtl' ? '  جميع الاذواق تصنيفات' : 'All Categories'}
         
        </StyledMenuItem>
      ) : (
        <StyledMenuItem disabled value="">
          <em>فئة المنتج</em>
        </StyledMenuItem>
      )}
      {map(listCategories, (categoryItem: ICategory, index) => (
        <StyledMenuItem
          title={categoryItem.description}
          onClick={() => props.setCategory(categoryItem._id)}
          key={index}
          id={categoryItem._id}
          value= {props.dir ==='rtl' ? categoryItem?.name : categoryItem?.nametr}
        >
          {props.dir ==='rtl' ? categoryItem?.name : categoryItem?.nametr}
        </StyledMenuItem>
      ))}
    </Select>
  );
}
