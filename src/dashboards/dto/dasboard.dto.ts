import { IsDate, IsInt, IsString, ValidateNested } from 'class-validator';

import { WidgetDto } from './widget.dto';

export class DashboardDto {

    name: string;

    daterange: string[];

    widgets: WidgetDto[];
}