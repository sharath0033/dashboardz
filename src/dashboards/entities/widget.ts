import { ApiProperty } from '@nestjs/swagger';

export class Widget {
    @ApiProperty({
        example: '1',
        description: 'Id of the widget'
    })
    id: string;

    @ApiProperty({
        example: 'Revenue widget',
        description: 'Name of the widget'
    })
    name: string;

    @ApiProperty({
        example: 'pie',
        description: 'Type of the widget'
    })
    type: string;

    @ApiProperty({
        example: '',
        description: 'Mapping of the widget'
    })
    mapping: any;

    @ApiProperty({
        example: 23,
        description: 'X-axis position of the widget'
    })
    x: number;

    @ApiProperty({
        example: 13,
        description: 'Y-axis position of the widget'
    })
    y: number;

    @ApiProperty({
        example: 400,
        description: 'Width of the widget'
    })
    w: number;

    @ApiProperty({
        example: 200,
        description: 'Height of the widget'
    })
    h: number;
}