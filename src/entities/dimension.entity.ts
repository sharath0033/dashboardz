import { ApiProperty } from "@nestjs/swagger";

export class Dimension {
    @ApiProperty({
        example: 'campaign_name',
        description: 'Name of the dimension'
    })
    name: string;

    @ApiProperty({
        example: 'STRING',
        description: 'Data-type of the dimension'
    })
    dataType: string;
}