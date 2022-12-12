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
        Schema::table('disaster_times', function (Blueprint $table) {
            $table->dropColumn('endTime');
            $table->dropColumn('startTime');
            $table->dateTime('Time');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('disaster_times', function (Blueprint $table) {
            //
        });
    }
};