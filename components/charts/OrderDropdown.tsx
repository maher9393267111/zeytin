import { useState, useEffect } from "react";
import { map } from "lodash";
import { Select, MenuItem ,Typography ,createTheme } from "@material-ui/core";
import OutlinedInput from "@mui/material/OutlinedInput";
import styled from "styled-components";
import axios from "axios";
import { message } from "antd";

interface ICategory {
  _id: string;
  name: string;
  description: string;
}

const theme = createTheme();

const StyledMenuItem = styled(MenuItem)`
  &:hover {
    background-color: #f5f5f5;
  }
  outline: none !important;
  color: #29221f !important;
  margin-bottom: 5px !important;
  font-family: '"Cairo", sans-serif !important',
`;


const StyledSelect = styled(Select)`

`;




interface DropDownCategoriesProps {
  setCategory: (category: string) => void;
  selectedCategory?: string;
  getAllCategories?: boolean;
}

export default function DropDownOrder(props: DropDownCategoriesProps) {
  const [listCategories, setListCategories] = useState<ICategory[]>([
    {_id:'1' ,name :'day' , description:'الطلبيات اليوم'} ,
    {_id:'2' ,name :'week' , description:'الطلبيات هذا الاسبوع'} ,
    {_id:'3' ,name :'month' , description:'الطلبيات هذا الشهر'} ,
    {_id:'3' ,name :'all' , description:'الطلبيات كل الاوقات'} ,
    
  ]);
  const [category, setCategory] = useState("");

  return (
    <StyledSelect
      fullWidth
      input={<OutlinedInput />}
      inputProps={{ "aria-label": "Without label" }}
      displayEmpty
      value={category}
      onChange={(event) => setCategory(event.target.value as string)}
      renderValue={(selected) => {
        if (!selected) {
          return props.getAllCategories && "كافة الطلبيات";
        }
        return selected.toString();
      }}
    >
     
      

      {map(listCategories, (categoryItem: ICategory, index) => (
        <StyledMenuItem
          title={categoryItem.description}
          onClick={() => props.setCategory(categoryItem.name)}
          key={index}
          id={categoryItem._id}
          value={categoryItem.description}
        >
          {categoryItem.description}
        </StyledMenuItem>
      ))}
    </StyledSelect>
  );
}
