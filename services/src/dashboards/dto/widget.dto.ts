import { IsDate, IsInt, IsString, ValidateNested } from 'class-validator';

export class WidgetDto {

    name: string;

    type: string;

    mapping: any;

    x: number;

    y: number;

    w: number;

    h: number;
}