import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductImage } from './';
import { User } from '../../auth/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'products' })
export class Product {

    @ApiProperty({
        example: '0051d7ae-ef7c-45bb-a0a6-88c8aa9ecd96',
        description: 'Product ID',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;


    @ApiProperty({ 
        example: 'Men’s Chill Crew Neck Sweatshirt',
        description: 'Product Title',
        uniqueItems: true
    })
    @Column('text', {
        unique: true,
    })
    title: string;


    @ApiProperty({
        example: 0,
        description: 'Product Price'
    })
    @Column('float',{
        default: 0
    })
    price: number;


    @ApiProperty({
        example: 'Designed for comfort, the Cybertruck Owl Tee is made from 100% cotton and features our signature Cybertruck icon on the back.',
        description: 'Product Description',
        default: null
    })
    @Column({
        type: 'text',
        nullable: true
    })
    description: string;


    @ApiProperty({
        example: 'mens_chill_crew_neck_sweatshirt',
        description: 'Product Slug for SEO',
        uniqueItems: true
    })
    @Column('text', {
        unique: true
    })
    slug: string;


    @ApiProperty({
        example: 10,
        description: 'Product Stock',
        default: 0
    })
    @Column('int', {
        default: 0
    })
    stock: number;


    @ApiProperty({
        example: ['M','L','XL'],
        description: 'Product Sizes'
    })
    @Column('text',{
        array: true
    })
    sizes: string[];


    @ApiProperty({
        example: 'men',
        description: 'Product Gender'
    })
    @Column('text')
    gender: string;


    @ApiProperty({
        example: 'sweatshirt',
        description: 'Product Category'
    })
    @Column('text', {
        array: true,
        default: []
    })
    tags: string[];


    // images
    @ApiProperty()
    @OneToMany(
        () => ProductImage,
        (productImage) => productImage.product,
        { cascade: true, eager: true }
    )
    images?: ProductImage[];


    // User
    @ManyToOne(
        () => User,
        ( user ) => user.product,
        // Cargar la información del usuario que creó el producto
        { eager: true }
    )
    user: User


    @BeforeInsert()
    checkSlugInsert() {

        if ( !this.slug ) {
            this.slug = this.title;
        }

        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ','_')
            .replaceAll("'",'')

    }

    @BeforeUpdate()
    checkSlugUpdate() {
        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ','_')
            .replaceAll("'",'')
    }


}
