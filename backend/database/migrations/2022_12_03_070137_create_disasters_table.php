<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('disasters', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('level');
            $table->string('type');
            $table->dateTime('startTime');
            $table->dateTime('endTime');
            $table->integer('startPointID');
            $table->integer('endPointID');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('disasters');
    }
};